# Python初心者開発者向け開発ガイド

## クイックスタート例

実際の例を使って説明します：アプリに天気データを追加する。

### 1. データスクレイパーの作成

```python
# data_collection/scrapers/weather_scraper.py
import requests
from bs4 import BeautifulSoup

def scrape_weather_data(city):
    """都市の平均気温をスクレイピング"""
    url = f"https://weather-site.com/{city}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 気温データを探す
    temp = soup.find('div', class_='avg-temp').text
    return {
        'city': city,
        'avg_temperature': float(temp),
        'unit': 'celsius'
    }
```

### 2. Luigiタスクの作成

```python
# data_collection/tasks.py
import luigi
import json

class ScrapeWeatherData(luigi.Task):
    """全都市の天気をスクレイピングするタスク"""
    
    def output(self):
        return luigi.LocalTarget('data/raw/weather_data.json')
    
    def run(self):
        weather_data = []
        for city in CITIES:
            data = scrape_weather_data(city)
            weather_data.append(data)
        
        # ファイルに保存
        with self.output().open('w') as f:
            json.dump(weather_data, f)
```

### 3. APIエンドポイントの追加

```python
# backend/routers/weather.py
from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/weather/{city}")
def get_weather(city: str):
    """都市の天気データを取得"""
    # データを読み込み
    with open('data/processed/weather_data.json') as f:
        data = json.load(f)
    
    # 都市を探す
    city_weather = next(
        (item for item in data if item['city'] == city), 
        None
    )
    
    if not city_weather:
        return {"error": "City not found"}
    
    return city_weather
```

### 4. ルーターの登録

```python
# backend/main.py
from routers import weather

app.include_router(weather.router, prefix="/api")
```

## 一般的なパターン

### パターン1: データパイプライン構造
```
生データ → クリーンデータ → マスターデータ → サマリーデータ
```

各ステップは前のステップに依存するLuigiタスクです。

### パターン2: API構造
```
ルーター（HTTP処理）→ サービス（ビジネスロジック）→ データアクセス
```

### パターン3: エラーハンドリング
```python
# 常に欠損データを処理
try:
    data = load_data(city)
except FileNotFoundError:
    return {"error": "Data not available"}
```

## デバッグのヒント

### 1. パイプラインの問題
```bash
# Luigiタスクのステータスを確認
python -m luigi --module tasks ScrapeWeatherData --local-scheduler

# タスクの依存関係を表示
python -m luigi --module tasks AllTasks --local-scheduler
```

### 2. APIの問題
```bash
# エンドポイントを直接テスト
curl http://localhost:8000/api/weather/Tokyo

# APIドキュメントを確認
# ブラウザでhttp://localhost:8000/docsを開く
```

### 3. データの問題
```python
# クイックデータ確認スクリプト
import json

with open('data/raw/weather_data.json') as f:
    data = json.load(f)
    print(f"都市数: {len(data)}")
    print(f"サンプル: {data[0]}")
```

## プロジェクト構造の説明

```
migrate/
├── data_collection/          # ここで最も多くの時間を過ごす
│   ├── tasks.py             # Luigiパイプライン定義
│   ├── scrapers/            # ウェブスクレイピング関数
│   │   ├── numbeo.py        # 生活費スクレイパー
│   │   └── weather.py       # 天気スクレイパー（あなたが作成！）
│   └── constants.py         # 都市リスト、設定
│
├── backend/                 # FastAPIアプリケーション
│   ├── main.py             # アプリ設定と構成
│   ├── routers/            # APIエンドポイント（機能ごとに1ファイル）
│   │   ├── cities.py       # 都市関連エンドポイント
│   │   └── weather.py      # 天気エンドポイント（あなたが作成！）
│   └── services/           # ビジネスロジック（オプション）
│
├── data/                   # 生成されたデータファイル
│   ├── raw/               # スクレイパーから直接
│   ├── cleaned/           # クリーニング後
│   └── processed/         # API用準備完了
│
└── logs/                  # 問題発生時にここをデバッグ
```

## ステップバイステップのワークフロー

### 新機能の追加（例：天気）

1. **データ構造の計画**
   ```python
   {
       "city": "Tokyo",
       "avg_temperature": 16.5,
       "rainfall_days": 120,
       "sunny_days": 200
   }
   ```

2. **スクレイパーの作成**
   - `scrapers/weather.py`を作成
   - 最初は1つの都市でテスト

3. **Luigiタスクの作成**
   - `tasks.py`に追加
   - テスト: `python -m luigi --module tasks ScrapeWeatherData`

4. **メインパイプラインに追加**
   ```python
   class AllTasks(luigi.Task):
       def requires(self):
           return [
               ExistingTask(),
               ScrapeWeatherData()  # ここに追加
           ]
   ```

5. **APIエンドポイントの作成**
   - 新ファイル: `routers/weather.py`
   - `main.py`に登録

6. **全体のテスト**
   ```bash
   # パイプライン実行
   python -m luigi --module tasks AllTasks
   
   # API起動
   cd backend && uvicorn main:app
   
   # エンドポイントテスト
   curl http://localhost:8000/api/weather/Tokyo
   ```

## 初心者向けFAQ

**Q: 新しいデータを追加したい場合、どこから始めればいいですか？**
A: `data_collection/scrapers/`から始めてください - データを取得する関数を作成

**Q: スクレイパーが動作するかどうか確認する方法は？**
A: まず単体でテストしてください：
```python
from scrapers.weather import scrape_weather_data
print(scrape_weather_data("Tokyo"))
```

**Q: スクレイピングしているウェブサイトが変更された場合は？**
A: スクレイパーを更新してパイプラインを再実行してください。`logs/`でエラーを確認。

**Q: 新しい都市を追加する方法は？**
A: `data_collection/constants.py`の`CITIES`リストに追加

**Q: フロントエンドが複雑に見えますが、Reactを学ぶ必要がありますか？**
A: いいえ！Pythonに集中してください。フロントエンドは自動的にあなたのAPIデータを使用します。

## 覚えておいてください

- データとAPIレイヤーを構築しています - そこがPythonの輝く場所です
- Luigiはデータ収集を管理しやすいタスクに整理するのに役立ちます
- FastAPIは自動ドキュメントでAPIを簡単に作成できます
- 各部分を接続する前に個別にテストしてください
- フロントエンドは単にあなたのPythonの作業を表示しているだけです！

楽しくコーディングしてください！🐍