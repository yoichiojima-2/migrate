from pathlib import Path
import pandas as pd


def main():
    root = Path().home() / ".sign-to-migrate/data/raw"
    doc_dir = Path(__file__).parent.parent / "docs"

    doc_dir.mkdir(exist_ok=True, parents=True)

    features_md = (doc_dir / "features.md").open("w")

    for f in root.rglob("*.json"):
        features_md.write(f"# {f.stem.replace('-', ' ')}\n")
        for row in pd.read_json(f)["feature"].drop_duplicates():
            features_md.write(f"- {row.lower()}\n")

        features_md.write("\n")


if __name__ == "__main__":
    main()
