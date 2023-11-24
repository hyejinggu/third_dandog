export default function CommunityPost({ addedPostArray }) {
  const date = new Date();
  return (
    <tbody>
      {addedPostArray.map((post, index) => (
        <tr key={index}>
          <td>{addedPostArray.length - index}</td>
          <td>
            <img src={post.image} />
          </td>
          <td>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </td>
          <td>{post.userid}</td>
          <td>{post.date}</td>
          <td>{post.recommended}</td>
          <td>{post.views}</td>
        </tr>
      ))}
    </tbody>
  );
}
