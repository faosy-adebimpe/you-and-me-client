import { Socket } from 'socket.io-client';

export type UserRegistrationType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type UserLoginType = {
    email: string;
    password: string;
};

export type UserInputType = {
    name: 'email' | 'password' | 'confirmPassword' | 'username';
    label: string;
};

// after authentication

export type UserAuthType = {
    _id: string;
    username: string;
    email: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    acceptTerms: boolean;
    role: string;
    verified: boolean;
};

export type UserType = {
    _id: string;
    username: string;
    email: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    acceptTerms: boolean;
    role: string;
    verified: boolean;
};

export type UserStoreType = {
    authUser: UserAuthType | null;
    checkAuth: () => Promise<void>;
    setAuthUser: (data: UserAuthType) => void;
    socket: Socket<ServerToClientProps, ClientToServerProps>;
    connectSocket: () => void;
    disconnectSocket: () => void;
    updatingProfile: boolean;
    updateProfile: (formData: {
        firstName: string;
        middleName?: string;
        lastName: string;
        image?: string;
        gender: string;
        dob: string;
    }) => void;
    uploadingProfilePicture: boolean;
    uploadProfilePicture: (profilePicture: string) => Promise<void>;

    requestingVerificationEmail: boolean;
    requestVerificationEmail: () => void;

    // online users
    onlineUsers: OnlineUsersType;
    getOnlineUsers: (onlineUsers: OnlineUsersType) => void;

    // logout
    loggingOut: boolean;
    logout: () => Promise<boolean>;
};

// online users types
// export type OnlineUsersType = { [key: string]: string };
export type OnlineUsersType = string[];

// socket
export type MessageStatus = {
    [key: string]: boolean;
};
export type ServerToClientProps = {
    message: (data: string) => void;
    'new-message': (data: MessageType) => void;
    'get-online-users': (onlineUers: OnlineUsersType) => void;
    'update-message-status': (data: MessageStatus) => void;
};
export type ClientToServerProps = {
    seen: (data: string) => void;
    'update-message-status': (data: MessageStatus) => void;
};

// message types

export type MessageStoreType = {
    messages: MessageType[];
    setMessages: (newMessages: MessageType[]) => void;
    addNewMessage: (newMessage: MessageType) => void;
    gettingUserMessages: boolean;
    getUserMessages: (user: UserType) => void;
    // addMessage: (newMessage: MessageType) => void;
    // users
    gettingUsers: boolean;
    users: UserType[];
    getUsers: () => void;
    getUser: (username: string) => UserType | undefined;
    getSelectedUser: (id: string) => UserType | undefined;

    // search user
    username: string;
    setUsername: (value: string) => void;
    searchingUser: boolean;
    searchUser: () => void;
    clearSearch: () => void;

    // online users
    onlineUsers: boolean;
    setOnlineUsers: (event: React.ChangeEvent<HTMLInputElement>) => void;
    toggleOnlineUsers: () => void;

    // unread messages
    allMessages: MessageType[];
    gettingAllMessages: boolean;
    getAllMessages: () => void;

    // unread messages
    unreadMessages: MessageType[];
    gettingUnreadMessages: boolean;
    getUnreadMessages: () => void;

    // read messages
    readMessagesData: MessageType[];
    readingMessages: boolean;
    readMessages: (senderId: string) => void;

    // awaiting messages
    awaitingMessages: MessageType[];
    setAwaitingMessages: (message: MessageType) => void;
    removeAwaitingMessage: (id: string) => void;
    clearAwaitingMessages: () => void;
    //
    awaitingMessage: MessageType | null;

    // sending messages
    // message: string;
    // setMessage: (value: string) => void;
    sendingMessage: boolean;
    sendMessage: (user: UserType, message: string) => void;
};

export type MessageType = {
    _id?: string;
    id?: string;
    senderId?: string;
    receiverId?: string;
    text?: string;
    image?: string;
    sent?: boolean;
    received?: boolean;
    read?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type TestUser = {
    username: string;
    latestMessage: string;
    time: string;
    image: string;
};
