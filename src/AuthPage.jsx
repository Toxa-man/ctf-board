import React from 'react'

const AuthPage = () => {
    return (
        <div style={{backgroundColor: '#DCDCDC'}}>
            <Header/>
            <AuthForm />
        </div>
    )
}


const AuthForm = () => {
    return (
        <>
            <span>
                <form className="container-fluid pt-3" style={{ minWidth: 250, maxWidth: 600}}>
                    <div className="mb-3">
                        <label htmlFor="teamNameForm" className="form-label">Team name</label>
                        <input type="text" className="form-control" id="teamNameForm" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordForm" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordForm" />
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Login</button>
                </form>
            </span>

        </>
    )
}

const Header = () => {
    return (
        <>
            <div className="mx-auto pt-2" style={{ minWidth: 250, maxWidth: 600}}>
                <p> Welcome to CTF board, please log in</p>
            </div>
            
        </>
    )
}

export default AuthPage
