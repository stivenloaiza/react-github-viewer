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
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filters, setFilters] = React.useState({
        devLanguage: '',
        created: 'all',
        stars: 'all',
        visibility: 'all',
        order: 'updated:desc',
        search: ''
    });
    const accessToken = localStorage.getItem('accessToken') || '';
    const octokit = new Octokit({ auth: accessToken });
    const userName = localStorage.getItem('username') || '';
    type SortOption = "stars" | "forks" | "help-wanted-issues" | "updated" | undefined;
    type SortOrder = "desc" | "asc" | undefined;


    const loadRepos = useCallback(async (page = currentPage) => {
        setIsLoading(true);
        try {

            let q = `user:${userName}`;
            if (filters.devLanguage && filters.devLanguage !== '') {
                q += ` language:${filters.devLanguage}`;
            }
            if (filters.visibility && filters.visibility !== 'all') {
                q += ` is:${filters.visibility}`;
            }
            if (filters.stars !== 'all') {
                q += ` stars:${filters.stars}`;
            }
            if (filters.created && filters.created !== 'all') {
                const date = new Date();
                if (filters.created == 'currentYear') {
                    const lastYearDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0];
                    q += ` created:>=${lastYearDate}`;
                } else if (filters.created == 'currentMonth') {
                    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
                    q += ` created:>=${firstDayOfMonth}`;
                }
            }
            if (filters.search && filters.search !== '') {
                q += ` in:name ${filters.search}`;
            }
            const response = await octokit.rest.search.repos({
                q: q,
                sort: filters.order.split(':')[0] as SortOption,
                order: filters.order.split(':')[1] as SortOrder,
                per_page: 9,
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
    }, [currentPage, filters, userName, setIsLoading, setTotalRepos, setListRepos, setErrorOccurred]);

    useEffect(() => {
        loadRepos(currentPage);
    }, [currentPage, filters, loadRepos]);

    function cleanError(){
        setErrorOccurred(false);
    }

    useEffect(() => {
        const userData = localStorage.getItem('accessToken');
        if (!userData || userData === '') {
            navigate('/');
        }
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        console.log(event.type);
        setCurrentPage(newPage);
        loadRepos(newPage);
    };

    return {listRepos, isLoading, errorOcurred, cleanError, currentPage, handleChangePage, totalRepos, setDrawerOpen,
        drawerOpen, setFilters, filters} as const;
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