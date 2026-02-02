## 1. アプリ概要
タスクを期限と進捗のステータスで管理でき、期限切れや完了状況を可視化することで、自己管理を支援するアプリケーションです。

## 2.実装機能(予定)
今回の演習では、期間内に完成することを目的として、最低限のMVP機能の実装とすることにしました。将来的な拡張機能としては、

```bash
- ユーザー管理・認証
- 振り返り機能
- ストリーク機能
- タスクのタイマー機能（ポモドーロタイマー）
- 目標管理機能
```

等がありますが、今フェーズでは基本のタスク作成、閲覧、更新、削除処理のみです。ただし、ユーザー機能のみスケジュールを見ながら実装したいと思うので、データベース設計のみ作成しました。

拡張の際に起点となるtasksテーブルを作成し、今回の主要機能をひとつにまとめました。

## 3.技術構成および作成方針
```bash
技術スタック
- Laravel12
- Inertia.js + TailwindCSS(コンポーネントおよびライブラリの使用)
- MySQL
- ORM Eloquent

その他
- Github/ Git
- VScode
- Docker
- WSL2/ Ubuntu
```
### バックエンド作成方針
- Serviceクラス:TaskServiceのみ作成
- Model:リレーションとクエリスコープを管理
- RequestForm:バリデーションに使用
- Policy:権限管理
- fat model, thin controller の理念に基づき期限切れロジックはModel or Serviceクラスに集約させる

### UI作成方針
- daisyUI
- Material Design Icon

##4.環境構築
本アプリケーションの環境構築はこちらです。

### 4-1.プロジェクトディレクトリの作成とLaravelインストール
プロジェクトディレクトリを作成
```bash
mkdir laravel-inertia-app
cd laravel-inertia-app
```
Sailを使ってLaravelプロジェクトを作成
```bash
curl -s "https://laravel.build/myapp?with=mysql,redis" | bash
```
プロジェクトディレクトリでSailを起動
bash```
./vendor/bin/sail up -d
```
### 2. Sailエイリアスの設定方法
毎回vendor/bin/sailを打つのは長いので、エイリアスの設定をお勧めします。
```bash
# ~/.bashrc または ~/.zshrc に追加
echo "alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'" >> ~/.bashrc
source ~/.bashrc
```
以降は `sail` コマンドで実行します。
---

### Inertia.jsのインストール
サーバーサイド（Laravel）のインストール
```bash
sail composer require inertiajs/inertia-laravel
```
クライアントサイド（React）のインストール
```bash
sail npm install @inertiajs/react react react-dom
```
Vite React Pluginのインストール
```bash
sail npm install @vitejs/plugin-react
```
Inertiaミドルウェアの生成
```bash
sail artisan inertia:middleware
```
## 起動と動作確認
データベースマイグレーション
```bash
sail artisan migrate
```
Vite開発サーバーの起動
```bash
sail npm run dev
```
### ブラウザでアクセス
- トップページ: http://localhost

期待される表示:
- タスク一覧画面
  



