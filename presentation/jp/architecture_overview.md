# 都市データ比較プラットフォーム - アーキテクチャ概要

## システムアーキテクチャ

```mermaid
graph TB
    subgraph "フロントエンド"
        UI[React + TypeScript]
        Pages[ページ<br/>- ホーム<br/>- 比較<br/>- 生活費<br/>- 生活の質]
        Viz[Chart.js<br/>データ可視化]
        
        UI --> Pages
        UI --> Viz
    end
    
    subgraph "バックエンドAPI"
        FastAPI[FastAPIサーバー]
        Endpoints[APIエンドポイント<br/>- /cities_and_countries<br/>- /cost_of_living<br/>- /happiness_qol<br/>- /country]
        
        FastAPI --> Endpoints
    end
    
    subgraph "データ層"
        JSON[(JSONファイル<br/>- cost_of_living.json<br/>- happiness_qol.json<br/>- city_and_country.json)]
    end
    
    subgraph "データパイプライン"
        Luigi[Luigiオーケストレーター]
        Tasks[パイプラインタスク<br/>- 生データ収集<br/>- データクレンジング<br/>- データ集計]
        
        Luigi --> Tasks
    end
    
    subgraph "データソース"
        External[外部ソース<br/>- Numbeo<br/>- Kaggle<br/>- 天気API]
    end
    
    UI -->|HTTP/REST| FastAPI
    FastAPI -->|読み込み| JSON
    Tasks -->|書き込み| JSON
    Tasks -->|スクレイプ/取得| External
    
    style UI fill:#e3f2fd
    style FastAPI fill:#fff3e0
    style Luigi fill:#f3e5f5
    style JSON fill:#e8f5e9
```

## 技術スタック

### フロントエンド
- **React 19** - UIフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール＆開発サーバー
- **Chart.js + react-chartjs-2** - データ可視化
- **Tailwind CSS 4** - スタイリング
- **React Router 7** - クライアントサイドルーティング
- **Axios** - HTTPクライアント

### バックエンド
- **Python 3.13** - ランタイム
- **FastAPI** - Webフレームワーク
- **Uvicorn** - ASGIサーバー
- **Pandas** - データ操作
- **Poetry** - 依存関係管理

### データパイプライン
- **Luigi** - タスクオーケストレーション
- **BeautifulSoup4** - Webスクレイピング
- **Requests** - HTTPリクエスト
- **Pandas** - データ処理
- **scikit-learn** - データ分析

### インフラストラクチャ
- **Docker** - コンテナ化
- **Git + GitHub** - バージョン管理

## データフロー

```mermaid
sequenceDiagram
    participant User as ユーザー
    participant Frontend as フロントエンド
    participant Backend as バックエンド
    participant DataFiles as データファイル
    participant Pipeline as パイプライン
    participant Sources as ソース
    
    Note over Pipeline,Sources: 定期的なデータ収集
    Pipeline->>Sources: 最新データ取得
    Sources-->>Pipeline: 生データ
    Pipeline->>Pipeline: クリーン＆変換
    Pipeline->>DataFiles: JSON保存
    
    Note over User,DataFiles: ユーザーリクエストフロー
    User->>Frontend: 比較する都市を選択
    Frontend->>Backend: GET /cost_of_living?city1=X&city2=Y
    Backend->>DataFiles: JSONファイル読み込み
    DataFiles-->>Backend: データ
    Backend-->>Frontend: フォーマット済みレスポンス
    Frontend->>Frontend: チャート描画
    Frontend-->>User: 比較結果表示
```

## 主要機能

1. **複数都市比較** - 生活費、生活の質、幸福度指標の比較
2. **リアルタイムデータ可視化** - Chart.jsによるインタラクティブチャート
3. **自動データ更新** - Luigiパイプラインによる定期的な新鮮なデータ収集
4. **RESTful API** - FastAPIによるクリーンなAPI設計
5. **型安全性** - TypeScriptフロントエンドとPython型ヒント

## プロジェクト構造

```
presentation/
├── client-side/          # Reactフロントエンド
│   ├── src/
│   │   ├── components/   # UIコンポーネント
│   │   ├── pages/        # ルートページ
│   │   ├── services/     # API統合
│   │   └── types/        # TypeScript型定義
│   └── package.json
├── server-side/          # FastAPIバックエンド
│   ├── server_side/
│   │   └── main.py       # APIエンドポイント
│   ├── Dockerfile
│   └── pyproject.toml
├── collection/           # データパイプライン
│   ├── collection/
│   │   ├── raw/          # データ取得
│   │   ├── cleanse/      # データクリーニング
│   │   ├── summary/      # データ集計
│   │   └── main.py       # Luigiタスク
│   └── pyproject.toml
└── utils/                # 共有ユーティリティ
```