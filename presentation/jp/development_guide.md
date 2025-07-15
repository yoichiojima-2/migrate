# 開発ガイド

## 前提条件

- Python 3.13+
- Node.js 18+
- Poetry（Pythonパッケージマネージャー）
- Docker（オプション、コンテナ化デプロイメント用）

## プロジェクトセットアップ

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd presentation
```

### 2. バックエンドセットアップ
```bash
cd server-side
poetry install
poetry run uvicorn server_side.main:app --reload
```
APIは `http://localhost:8000` で利用可能

### 3. フロントエンドセットアップ
```bash
cd client-side
npm install
npm run dev
```
フロントエンドは `http://localhost:5173` で利用可能

### 4. データパイプラインセットアップ
```bash
cd collection
poetry install
poetry run python -m luigi --module collection.main AllTasks --local-scheduler
```

## 開発ワークフロー

### 新機能の追加

1. **新しいデータソース**
   - `collection/collection/raw/` にスクレイパーを追加
   - `collection/collection/cleanse/` にクリーナーを追加
   - `collection/collection/main.py` のLuigiタスクを更新

2. **新しいAPIエンドポイント**
   - `server-side/server_side/main.py` にエンドポイントを追加
   - データアクセスの既存パターンに従う

3. **新しいフロントエンド機能**
   - `client-side/src/components/` にコンポーネントを追加
   - `client-side/src/pages/` にページを追加
   - `App.tsx` のルーティングを更新

### コードスタイル

- **Python**: PEP 8に従い、`ruff`でリンティング
- **TypeScript**: 提供されたESLint設定を使用
- **コミット**: 従来のコミットメッセージを使用

### テスト

```bash
# バックエンドテスト
cd server-side
poetry run pytest

# フロントエンドテスト
cd client-side
npm run test

# データパイプラインテスト
cd collection
poetry run pytest
```

### 本番環境用ビルド

#### バックエンドDockerイメージ
```bash
cd server-side
docker build -t city-data-backend .
docker run -p 8000:8000 city-data-backend
```

#### フロントエンドビルド
```bash
cd client-side
npm run build
# dist/フォルダをホスティングサービスにデプロイ
```

## APIドキュメント

開発モードで実行時、APIドキュメントは以下で利用可能：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 一般的なタスク

### データ更新
```bash
cd collection
poetry run python -m luigi --module collection.main AllTasks --local-scheduler
```

### 新しい都市の追加
1. データソースに都市を追加
2. データパイプラインを実行
3. APIレスポンスで確認

### データ問題のデバッグ
1. `~/.sign-to-migrate/data/raw/` の生データを確認
2. `~/.sign-to-migrate/data/cleanse/` の処理済みデータを確認
3. `~/.sign-to-migrate/data/summary/` の最終データを確認

## 環境変数

### バックエンド
- `DEBUG`: デバッグモードを有効化（デフォルト: false）
- `ALLOWED_ORIGINS`: CORSオリジン（デフォルト: ["*"]）

### フロントエンド
- `VITE_API_URL`: バックエンドAPI URL（デフォルト: http://localhost:8000）

## トラブルシューティング

### ポートが既に使用中
```bash
# ポート8000のプロセスを終了
lsof -ti:8000 | xargs kill -9

# ポート5173のプロセスを終了
lsof -ti:5173 | xargs kill -9
```

### データが更新されない
1. Luigiタスクログを確認
2. 外部データソースがアクセス可能か確認
3. データディレクトリのファイル権限を確認

### CORS問題
1. バックエンド設定の`ALLOWED_ORIGINS`を確認
2. ブラウザコンソールで具体的なエラーを確認
3. フロントエンドが正しいAPI URLを使用しているか確認