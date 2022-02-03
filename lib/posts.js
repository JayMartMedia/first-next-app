import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // remove .md from filename to get id
        const id = fileName.replace(/\.md$/, '');

        // read md file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use gray-matter to parse the post metadata
        const matterResult = matter(fileContents);

        // combine data with id
        return {
            id,
            ...matterResult.data
        }
    });

    // sort posts by date
    return allPostsData.sort(({ date: a}, { date: b }) => {
        if ( a < b ) {
            return 1;
        } else if ( a > b ) {
            return -1;
        } else {
            return 0;
        }
    });
}