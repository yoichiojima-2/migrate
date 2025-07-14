# Sign to Migrate - アプリ概要

## 1. このアプリとは？

**Sign to Migrate** は、以下の要素を比較して、どの国・都市が住みやすいかを調べるためのアプリです：
- 💰 生活費（家賃、食費、交通費）
- 😊 QOL（幸福度、安全性、医療）
- 💼 雇用市場（失業率、収入）
- 🏠 住環境（気候、汚染、犯罪）

## 2. アーキテクチャ概要

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│  データソース    │ --> │ データパイプ  │ --> │ バックエンドAPI │
│  (ウェブサイト)  │     │ ライン(Python)│     │  (FastAPI)   │
└─────────────────┘     └──────────────┘     └──────────────┘
                                                      |
                                                      v
                                              ┌──────────────┐
                                              │ フロントエンド │
                                              │   (React)    │
                                              └──────────────┘
```

### コンポーネント：

#### 1. データパイプライン（Python + Luigi）
- **役割**: ウェブサイトから都市データを収集
- **技術**: Python、Luigi（ワークフロー管理）、BeautifulSoup（ウェブスクレイピング）
- **出力**: 都市データのJSON/Parquetファイル

#### 2. バックエンドAPI（Python + FastAPI）
- **役割**: フロントエンドにデータを提供
- **技術**: FastAPI（モダンなPythonウェブフレームワーク）
- **エンドポイント**: 
  - `/cities_and_countries` - 全都市リスト
  - `/cost_of_living` - 生活費データ
  - `/happiness_qol` - QOLデータ

#### 3. フロントエンド（React + TypeScript）
- **役割**: データをユーザーフレンドリーに表示
- **技術**: React、TypeScript、チャート
- **機能**: 都市比較、生活費計算、ランキング

## 3. 開発フロー

### Python初心者開発者向け：

#### ステップ1: データパイプラインの理解
```python
# 例: 生活費データをスクレイピングするLuigiタスク
class ScrapeCostOfLiving(luigi.Task):
    def run(self):
        # ウェブサイトからデータをスクレイピング
        data = scrape_numbeo_data()
        # ファイルに保存
        save_to_json(data)
```

#### ステップ2: APIでの作業
```python
# 例: FastAPIエンドポイント
@app.get("/cost_of_living")
def get_cost_of_living(city: str):
    # ファイルからデータを読み込み
    data = load_city_data(city)
    # フロントエンドに返す
    return data
```

#### ステップ3: 変更のテスト
1. データパイプライン実行: `python -m luigi --module tasks ScrapeCostOfLiving`
2. バックエンド起動: `uvicorn main:app --reload`
3. APIテスト: `http://localhost:8000/cost_of_living?city=Tokyo`

### 一般的なタスク：

1. **新しいデータソースの追加**:
   - `data_collection/`に新しいLuigiタスクを作成
   - スクレイピングロジックを追加
   - マスターデータタスクを更新

2. **新しいAPIエンドポイントの追加**:
   - `backend/routers/`にルートを作成
   - サービスロジックを追加
   - FastAPIドキュメントでテスト

3. **データ問題の修正**:
   - `logs/`のログを確認
   - ウェブサイトが変更された場合、スクレイピングロジックを更新
   - パイプラインを再実行

## 4. 知っておくべき主要ファイル

```
migrate/
├── data_collection/        # Luigiパイプラインタスク
│   ├── tasks.py           # メインパイプライン
│   └── scrapers/          # ウェブスクレイピングコード
├── backend/
│   ├── main.py            # FastAPIアプリ
│   ├── routers/           # APIエンドポイント
│   └── services/          # ビジネスロジック
├── frontend/
│   ├── src/
│   │   ├── pages/         # Reactページ
│   │   └── components/    # UIコンポーネント
└── data/                  # 保存された都市データ
```

## 5. 始め方

1. **依存関係をインストール**:
   ```bash
   pip install -r requirements.txt
   ```

2. **データパイプラインを実行**:
   ```bash
   python -m luigi --module data_collection.tasks AllTasks
   ```

3. **バックエンドを起動**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

4. **APIドキュメントを確認**:
   http://localhost:8000/docs を開く

## 6. 初心者開発者向けのヒント

- まずデータパイプラインを理解しよう - 全てPythonです！
- FastAPIの自動ドキュメントを使ってエンドポイントをテスト
- Luigiはタスクの依存関係を視覚的に表示
- 何か問題があったら `logs/` を確認
- フロントエンドはAPIが返すデータを表示するだけ

## 例：新しい都市の追加

1. `data_collection/constants.py`の`CITIES`リストに都市を追加
2. パイプラインを実行してデータを収集
3. APIが新しい都市のデータを返すかテスト
4. フロントエンドに自動的に表示される！

---

このアプリは、データ収集からAPI提供まで、Pythonがモダンなウェブアプリケーションのバックエンド全体を支えることができることを示しています。Reactフロントエンドは単なるプレゼンテーション層で、すべてのロジックはPythonにあります！