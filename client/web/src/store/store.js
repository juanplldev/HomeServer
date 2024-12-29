// Dependencies
import {create} from "zustand";
// Files
import * as api from "../api/api.js";
import {getUserData, removeUserData, setUserData} from "../services/localStorage.js";


export const useAppStore = create((set, get) => ({
    // State
    path: "",
    content: {},
    // Actions
    getPath: () => {
        return get().path;
    },
    getDir: async (path) => {
        const payload = await api.getDir(path);
        
        if(payload?.success)
        {
            set({
                path,
                content: payload.data.content,
            });
        };
        
        return payload;
    },
    postDir: async (path, name) => {
        const payload = await api.postDir(path, name);
        return payload;
    },
    putDir: async (path, name) => {
        const payload = await api.putDir(path, name);
        return payload;
    },
    deleteDir: async (path) => {
        const payload = await api.deleteDir(path);
        return payload;
    },
    getFile: async (path) => {
        const payload = await api.getFile(path);
        
        return payload;
    },
    postFile: async (path, file) => {
        const payload = await api.postFile(path, file);
        return payload;
    },
    putFile: async (path, name) => {
        const payload = await api.putFile(path, name);
        return payload;
    },
    deleteFile: async (path) => {
        const payload = await api.deleteFile(path);
        return payload;
    },
    getThumbnail: async (path) => {
        const payload = await api.getThumbnail(path);
        
        if(payload.type === "application/octet-stream")
        {
            const blob = new Blob([payload], {type: "image/webp"});
            const url = URL.createObjectURL(blob);
            
            return url;
        };
        
        return payload;
    },
    restart: async () => {
        const payload = await api.restart();
        return payload;
    },
    reloadContentState: async (path) => {
        const payload = await api.getDir(path);
        
        if(payload?.success)
        {
            set({
                path,
                content: payload.data.content,
            });
        };
        
        return payload;
    },
    cleanContentState: () => set({content: {}}),
}));

export const useAuthStore = create(set => ({
    // State
    users: [],
    token: getUserData().token,
    userId: getUserData().userId,
    isAdmin: getUserData().isAdmin,
    isAuthenticated: getUserData().token ? true : false,
    // Actions
    getUsers: async (id) => {
        const payload = await api.getUsers(id);
        
        if(payload?.success)
        {
            const users = payload.data.map(e => {
                return {username: e.username};
            });
            
            set({users: users});
        };
        
        return payload;
    },
    register: async (values) => {
        const payload = await api.register(values);
        return payload;
    },
    login: async (values) => {
        const payload = await api.login(values);
        const content = payload?.content;
        
        if(content)
        {
            const userData =
            {
                token: content?.token,
                userId: content?.userId,
                isAdmin: content?.isAdmin,
            };
            
            setUserData(userData);
            
            set({
                ...userData,
                isAuthenticated: true,
            });
        };
        
        return payload;
    },
    logout: () => {
        removeUserData();
        
        set({
            token: "",
            userId: "",
            isAdmin: false,
            isAuthenticated: false,
        });
    },
}));

export const useLoadingStore = create((set, get) => ({
    // State
    home: false,
    input: false,
    mouse: false,
    // Actions
    setLoading: (key, value) => {
        set({[key]: value});
    },
    isLoading: (key) => {
        return get()[key];
    },
}));

export const useUploadStore = create((set, get) => ({
    // State
    selectedFiles: [],
    acceptedFiles: [],
    rejectedFiles: [],
    uploadProgress: [],
    uploadedFiles: [],
    // Actions
    setFiles: (key, files) => {
        const prevFiles = get()[key];
        
        if(Array.isArray(files)) return set({[key]: files});
        
        set({[key]: [...prevFiles, files]});
    },
    getFiles: (key) => {
        if(key) return get()[key];
        return get();
    },
    removeFile: (file) => {
        const {selectedFiles, uploadProgress} = get();
        
        set({
            selectedFiles: selectedFiles.filter(e => e.name !== file.name),
            uploadProgress: uploadProgress.filter(e => e.name !== file.name),
        });
    },
    setUploadProgress: (file, progress) => {
        const {uploadProgress} = get();
        const existingUploadIndex = uploadProgress.findIndex(e => e.name === file.name);
        
        if(existingUploadIndex !== -1)
        {
            const updatedProgress = [...uploadProgress];
            
            updatedProgress[existingUploadIndex].progress = progress;
            
            set({uploadProgress: updatedProgress});
        }
        else
        {
            set({
                uploadProgress: [
                    ...uploadProgress,
                    {
                        name: file.name,
                        progress,
                    },
                ],
            });
        };
    },
    getUploadProgress: (file) => {
        if(file) return get().uploadProgress.filter(e => e.name === file.name)[0]?.progress;
        return get().uploadProgress;
    },
}));