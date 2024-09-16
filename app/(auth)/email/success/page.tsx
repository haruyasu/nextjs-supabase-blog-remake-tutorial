const EmailSuccessPage = () => {
  return (
    <div className="w-[500px] bg-white p-5 rounded-xl border">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        メールアドレス変更メール送信
      </div>

      <div className="text-sm">
        古いメールアドレスと新しいメールアドレスにメールアドレス変更に必要な情報を送信しました。
        <br />
        メールのURLよりメールアドレス変更を完了させてください。
        <br />
        古いメールアドレスと新しいメールアドレスの両方のURLをクリックする必要があります。
        <br />
        <br />
        ※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
        <br />
        <br />
        お手数ですが、再度、メールアドレス変更からやり直してください。
      </div>
    </div>
  )
}

export default EmailSuccessPage
