'use client';

import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';

const CheckAuth = () => {
    const { checkAuth } = useUserStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return null;
};

export default CheckAuth;
