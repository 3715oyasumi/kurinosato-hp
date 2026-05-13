(function () {
  if (sessionStorage.getItem('kurinosato_auth') === 'ok') return;

  const overlay = document.createElement('div');
  overlay.id = 'pw-overlay';
  overlay.innerHTML = `
    <div id="pw-box">
      <p id="pw-logo">栗の里</p>
      <p id="pw-label">パスワードを入力してください</p>
      <input id="pw-input" type="password" placeholder="パスワード" />
      <button id="pw-btn">入力</button>
      <p id="pw-error"></p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #pw-overlay {
      position: fixed;
      inset: 0;
      background: #2b1200;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
    }
    #pw-box {
      text-align: center;
      padding: 48px 40px;
      background: #fff8ee;
      border-radius: 16px;
      width: 320px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    #pw-logo {
      font-family: 'Zen Old Mincho', serif;
      font-size: 28px;
      font-weight: 900;
      color: #3d1f0d;
      letter-spacing: 0.3em;
      margin-bottom: 16px;
    }
    #pw-label {
      font-size: 13px;
      color: #666;
      margin-bottom: 20px;
    }
    #pw-input {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid #d0b98a;
      border-radius: 8px;
      font-size: 16px;
      margin-bottom: 12px;
      box-sizing: border-box;
      text-align: center;
      letter-spacing: 0.2em;
    }
    #pw-btn {
      width: 100%;
      padding: 12px;
      background: #3d1f0d;
      color: #fff8ee;
      border: none;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.1em;
    }
    #pw-btn:hover { background: #5a3020; }
    #pw-error {
      margin-top: 12px;
      font-size: 12px;
      color: #c0392b;
      min-height: 16px;
    }
  `;

  document.head.appendChild(style);
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(overlay);
    document.getElementById('pw-input').focus();

    function check() {
      const val = document.getElementById('pw-input').value;
      if (val === '505019') {
        sessionStorage.setItem('kurinosato_auth', 'ok');
        overlay.remove();
      } else {
        document.getElementById('pw-error').textContent = 'パスワードが違います';
        document.getElementById('pw-input').value = '';
        document.getElementById('pw-input').focus();
      }
    }

    document.getElementById('pw-btn').addEventListener('click', check);
    document.getElementById('pw-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') check();
    });
  });
})();
