import {useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import {Octokit} from "octokit";
import {RepositoryGitHub} from "../models/github.ts";

export function useHome() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [errorOcurred, setErrorOccurred] = useState(false);
    const [listRepos, setListRepos] = useState<RepositoryGitHub[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRepos, setTotalRepos] = useState(0);
    const accessToken = localStorage.getItem('accessToken') || '';
    const octokit = new Octokit({ auth: accessToken });
    type RepoType = 'all' | 'owner' | 'public' | 'private' | 'member';
    type SortType = "updated" | "stars" | "forks" | "help-wanted-issues";
    const userName = localStorage.getItem('username') || '';


    const loadRepos = useCallback(async (page = currentPage, sort: SortType = 'updated', type: RepoType = 'all') => {
        setIsLoading(true);
        try {
            const response = await octokit.rest.search.repos({
                q: `user:${userName}`,
                type: type,
                sort: sort,
                per_page: 8,
                page: page
            });
            setTotalRepos(response.data.total_count);
            setListRepos(response.data.items as RepositoryGitHub[]);
            setIsLoading(false);
            setErrorOccurred(false);
        } catch (error) {
            console.log(error);
            setErrorOccurred(true);
            setIsLoading(false);
        }
    }, []);


    function cleanError(){
        setErrorOccurred(false);
    }

    useEffect(() => {
        const userData = localStorage.getItem('accessToken');
        if (!userData || userData === '') {
            navigate('/');
        }else{
            loadRepos();
        }
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        console.log(event.type);
        setCurrentPage(newPage);
        loadRepos(newPage);
    };

    return {listRepos, isLoading, errorOcurred, cleanError, currentPage, handleChangePage, totalRepos} as const;
}

export function useAppBar() {
    const navigate = useNavigate();


    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.setItem('username', '');
            localStorage.setItem('userPhoto', '');
            localStorage.setItem('accessToken', '');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };


    return {logout} as const;
}