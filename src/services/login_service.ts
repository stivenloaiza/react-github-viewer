import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";
import {Octokit} from "octokit";



export function useLogin() {
    const provider = new GithubAuthProvider();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorInLogin, setError] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('accessToken');
        if (userData !== null && userData !== '') {
            navigate('/home');
        }
    }, [navigate]);

    const loginService = async () => {
        setError(false);
        setIsLoading(true);
        try {
            provider.addScope('repo');
            const res = await signInWithPopup(auth, provider);
            if (!res) {
                throw new Error("Could not complete signup");
            }
            const credential = GithubAuthProvider.credentialFromResult(res);
            const accessToken = credential!.accessToken || '';
            const user = res.user;
            const octokit = new Octokit({ auth: accessToken });
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            localStorage.setItem('username', login);
            localStorage.setItem('userPhoto', user.photoURL!);
            localStorage.setItem('accessToken', accessToken);
            setIsLoading(false);
            setError(false);
            navigate('/home');
        } catch (error) {
            console.log(error);
            setError(true);
            setIsLoading(false);
        }
    };

    function cleanError(){
        setError(false);
    }
    return {isLoading, errorInLogin, loginService, cleanError} as const;
}
