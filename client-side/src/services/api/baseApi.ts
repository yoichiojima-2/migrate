import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class BaseApiService {
  private client: AxiosInstance;
  private cache = new Map<string, CacheEntry<any>>();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const apiError: ApiError = new Error(
          error.response?.data?.message ||
            error.message ||
            "API request failed",
        );
        apiError.status = error.response?.status;
        apiError.code = error.code;

        console.error("[API Error]", {
          url: error.config?.url,
          status: error.response?.status,
          message: apiError.message,
        });

        return Promise.reject(apiError);
      },
    );
  }

  private getCacheKey(url: string, config?: AxiosRequestConfig): string {
    return `${url}_${JSON.stringify(config?.params || {})}`;
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() > entry.expiresAt;
  }

  private setCache<T>(key: string, data: T): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + this.cacheTimeout,
    });
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  private async retry<T>(operation: () => Promise<T>, attempt = 1): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= this.maxRetries) {
        throw error;
      }

      const isRetryableError =
        axios.isAxiosError(error) &&
        (error.code === "ECONNABORTED" ||
          error.code === "ENOTFOUND" ||
          (error.response?.status && error.response.status >= 500));

      if (!isRetryableError) {
        throw error;
      }

      console.warn(
        `API call failed, retrying (${attempt}/${this.maxRetries})...`,
      );
      await new Promise((resolve) =>
        setTimeout(resolve, this.retryDelay * attempt),
      );
      return this.retry(operation, attempt + 1);
    }
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const cacheKey = this.getCacheKey(url, config);

    // Check cache first
    const cachedData = this.getFromCache<T>(cacheKey);
    if (cachedData) {
      console.log(`[Cache Hit] ${url}`);
      return cachedData;
    }

    // Make request with retry logic
    const data = await this.retry(async () => {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    });

    // Cache the result
    this.setCache(cacheKey, data);
    return data;
  }

  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}
