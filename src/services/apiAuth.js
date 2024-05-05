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

export async function getCurrentUser() {
    // updating data from Current User to supabase = fetching = taking data
    // from local storage as the data input by user.
    const { data: sessionDt } = await supabase.auth.getSession();

    if (!sessionDt.session) return null;

    //  then we are taking those current User data from Supabase to our app
    const { data, error } = await supabase.auth.getUser();

    // collect data from database use "?" to check that data is exit in the
    // data base if data is exit then bring the user from there as a data.

    // HOW WE MANAGE THOSE DATA TO USE IN ui ?
    // we manage those data through React Query - where we need UseHook
    //  then useHook return data - we use in UI component

    return data?.user;
}

// in Use Hook - use  --UseQuery()-- for collecting new data
//  ?? useQuery() has 3 stage = data, error and isloading

// in use Hook - use --UseMutation() -- for updating UI exiting data
// ?? useMutation() has 2 stage = ( function) mutate , isloading
