const RestPasswordSuccessPage = () => {
  return (
    <div className="w-[500px] bg-white p-5 rounded-xl border">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        パスワード再設定メール送信
      </div>

      <div className="text-sm">
        メールアドレスにパスワード再設定に必要な情報を送信しました。
        <br />
        メールのURLよりパスワードを再設定してください。
        <br />
        <br />
        ※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
        <br />
        <br />
        お手数ですが、再度、パスワード再設定からやり直してください。
      </div>
    </div>
  )
}

export default RestPasswordSuccessPage
