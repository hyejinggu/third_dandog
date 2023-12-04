import { Link } from "react-router-dom";

export default function CommunityPost({ loungeArray }) {
  return (
    <tbody>
      {loungeArray.map((post, index) => {
        const dateObject = new Date(post.regdate);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
        const day = dateObject.getDate();

        return (
          <tr key={index}>
            <td>{loungeArray.length - index}</td>
            <td>
              <Link to="/community/loungepostdetail" state={{ post: post }}>
                <div>
                  <img
                    src={`/images/community/${post.lounge_img}`}
                    alt={`Lounge ${index + 1}`}
                  />
                </div>
              </Link>
            </td>
            <td>
              <h4>{post.lounge_title}</h4>
              <p>{post.lounge_content}</p>
            </td>
            <td>{post.user_id}</td>
            <td>{`${year}-${month}-${day}`}</td>
            <td>{post.lounge_likes}</td>
            <td>{post.lounge_hits}</td>
          </tr>
        );
      })}
    </tbody>
  );
}
