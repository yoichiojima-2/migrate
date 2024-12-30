FROM python:3.13-slim

WORKDIR /app
COPY server-side/ /app/server-side/
COPY utils/ /app/utils/
COPY assets /root/.sign-to-migrate/data
RUN pip install --upgrade pip && pip install poetry
WORKDIR /app/server-side
RUN poetry install
EXPOSE 8000
CMD ["poetry", "run", "uvicorn", "server_side.main:app", "--host", "0.0.0.0", "--port", "8000"]