import supabase from "./supabase.js";

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    console.error(error);
    if (error) throw new Error(error.message);

    return data;
}
