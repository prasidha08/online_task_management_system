// ============================== USER URL =======================================

export const USER_BASE_URL = "/api/user" as const;

export const ADD_FRIEND_URL = "/add-friend/:userId" as const;

export const REMOVE_FRIEND_URL = "/remove-friend/:userId" as const;

export const UPDATE_USER_URL = "/:userId" as const;

export const USER_SIGN_IN = "/sign-in" as const;

export const REFRESH_TOKEN_URL = "refresh-token" as const;
// ================================ END  ==========================================

//=============================== CATEGORY URL ====================================

export const CATEGORY_BASE_URL = "/api/category" as const;

export const CATEGORY_PARAMS_URL = "/:categoryId" as const;

// ==============================   END   =========================================

// ============================== TASK URL ========================================

export const TASK_BASE_URL = "/api/task" as const;

export const TASKS_PARAMS_URL = "/:categoryId" as const;

// ==============================   END    =========================================
