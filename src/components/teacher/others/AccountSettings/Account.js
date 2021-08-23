import React,{useState} from 'react'

function Account({teacher, setTeacher}) {
     
    return (
        <div className="tab-pane" id="account">
                  <h6>HESAP AYARLARIN</h6>
                  <hr />
                  <form>
                    <div className="form-group">
                      <label htmlFor="username">E-Mail</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="usernameHelp"
                        placeholder="Enter your username"
                        value={teacher && teacher.email}
                        onChange={e => setTeacher({...teacher, email: e.target.value})}
                      />
                      <small id="usernameHelp" className="form-text text-muted">
                       E-mail adresinizi değiştirdiğinizde sisteme giriş yaparken artık
                       yeni adresiniz referans alınacaktır.
                      </small>
                    </div>
                    <hr />
                    <div className="form-group">
                      <label className="d-block text-danger">
                       Hesabını Sil
                      </label>
                      <p className="text-muted font-size-sm">
                        Hesabınızı sildiğinizde bir daha geri alamazsınız
                      </p>
                    </div>
                    <button className="btn btn-danger" type="button">
                      Hesabını Sil
                    </button>
                  </form>
                </div>
    )
}

export default Account
