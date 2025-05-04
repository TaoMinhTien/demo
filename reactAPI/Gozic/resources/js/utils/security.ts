
export const saveToLocal = <T>({
    key, value

}: {
    key: string;
    value: T;
}): boolean => {
    try {
        if (typeof window === 'undefined') {
            console.log('LocalStorage is not availbale on server side');
            return false;
        }

        const storageValue = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, storageValue);
        return true;

    } catch (error) {
        console.log('Error saving to localStorage:', error);
        return false;
    }
}

export const getFromLocal = <T>(key: string): T | null => {
    try {
        if (typeof window === 'undefined') {
            return null;
        }

        const value = localStorage.getItem(key);
        if (value == null) return null

        try {
            return JSON.stringify(value) as T;
        } catch {
            return value as T;
        }

    } catch (error) {
        return null
    }
}

export const removeFromLocal = (key: string): void => {
    try {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    } catch (error) {
        console.log('Error removing from localStorage:', error);
    }
}

