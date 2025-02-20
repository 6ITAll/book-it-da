import { supabase } from '@utils/Supabase/supabaseClient';

async function deleteUserFiles(userId: string) {
  try {
    const bucketName = 'avatars';
    const folderPath = `${userId}/`;

    const { data: files, error: listError } = await supabase.storage
      .from(bucketName)
      .list(folderPath);

    if (listError) {
      console.error('파일 목록 가져오기 오류:', listError);
      return false;
    }

    if (files.length === 0) {
      console.log('삭제할 파일이 없습니다.');
      return true;
    }

    const filePaths = files.map((file) => `${folderPath}${file.name}`);

    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove(filePaths);

    if (deleteError) {
      console.error('파일 삭제 오류:', deleteError);
      return false;
    }

    console.log('모든 파일이 성공적으로 삭제되었습니다.');
    return true;
  } catch (err) {
    console.error('알 수 없는 오류 발생:', err);
    return false;
  }
}

export default deleteUserFiles;
