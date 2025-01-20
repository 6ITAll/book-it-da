import { supabase } from '@utils/supabaseClient';

export const checkEmailDuplicate = async (email: string): Promise<boolean> => {
  console.log(email);

  try {
    const { data, error } = await supabase
      .from('user')
      .select()
      .ilike('email', email);

    console.log(data);
    console.log(email);

    if (error) {
      console.error('Error checking email duplicate:', error);
      throw error;
    }

    return data?.length !== 0 ? false : true;
  } catch (error) {
    console.error('Unexpected error during email duplicate check:', error);
    throw error;
  }
};

export const checkUserIdDuplicate = async (
  userId: string,
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select()
      .ilike('username', userId);

    if (error) throw error;

    return data?.length !== 0 ? false : true;
  } catch (error) {
    console.error('Error checking userId duplicate:', error);
    throw error;
  }
};
