import React from 'react';
import {connect} from "react-redux";
import {signIn,signOut} from "../actions";


class GoogleAuth extends React.Component {

    componentDidMount() {
        // googleAut old version
        window.gapi.load("client:auth2",()=>{
            window.gapi.client.init({
                clientId:"736858813759-bpps7h41s5on24a9rmmflitm10lgm3j6.apps.googleusercontent.com",
                scope:"email"
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        })

        //google Auth2 new Version
        // window.gapi.load("auth2",()=>{
        //     window.gapi.auth2.init({
        //         clientId:"736858813759-bpps7h41s5on24a9rmmflitm10lgm3j6.apps.googleusercontent.com",
        //         scope:"email"
        //     }).then((GoogleAuth2)=>{
        //         if(GoogleAuth2){
        //             this.auth = GoogleAuth2;
        //             this.onAuthChange(this.auth.currentUser.get().isSignedIn())
        //             this.auth.isSignedIn.listen(this.onAuthChange)
        //         }
        //     });
        // })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignIn = () =>{
        this.auth.signIn();
    }

    onSignOut = () =>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;

        }else if (this.props.isSignedIn){
            return (
                <button onClick={this.onSignOut} className={"ui google button"}>
                    <i className={"google icon"} />
                    Sign Out
                </button>
            )

        }else{
            return (
                <button onClick={this.onSignIn} className={"ui google red button"}>
                    <i className={"google icon"} />
                    Sign In
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        isSignedIn: state.auth.isSignedIn
    }

}

export default connect(mapStateToProps, {signOut,signIn})(GoogleAuth);
