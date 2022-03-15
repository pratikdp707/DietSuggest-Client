import cookie from 'js-cookie'

export const setCookie = (key, value) => {
    if (window !== 'undefiend') {
        cookie.set(key, value, {
            // 1 Day
            expires: 1
        }) 
    }
}

export const getCookie = key => {
    if (window !== 'undefined') {
        return cookie.get(key);
    }
};

export const removeCookie = key => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        });
    }
};

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token-diet', response.data.data);
    next();
};

export const setLocalStorage = (key, value) => {
    if (window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (window !== 'undefined') {
        localStorage.removeItem(key);
    }
};


