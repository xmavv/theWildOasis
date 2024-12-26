import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  //to sprawdza local storage czy jest sesja
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  //tutaj na nowo pobieramy tego uzytkownika,
  // bo tak jest bezpieczniej i mozemy wtedy wyswietlic loading spinner
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}
