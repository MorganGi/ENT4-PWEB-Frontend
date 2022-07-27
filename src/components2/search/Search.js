import axios from "axios";
import React, { useState } from "react";

function Search() {
  const [searched, setSearched] = useState("");
  const [text, setText] = useState([]);
  const [ok, setOk] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();

    axios.get("http://localhost:8080/extract-text").then((res) => {
      console.log(res);
      const newText = res.data;
      setText([...text, newText]);
      setOk(!ok);
    });
  };

  // const onSearch = () => {
  //   for (let i = 0; i < text.length; i++) {
  //     console.log("bb");
  //   }
  // };

  return (
    <div>
      <form method="POST" action="#" id="#" onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearched(e.target.value)}
        />
        <input className="add" type="submit" />
      </form>

      <p>
        {ok &&
          text[0].map((tex, i) => (
            <div>
              <li key={i}>{tex}</li>;
            </div>
          ))}
      </p>
    </div>
  );
}
export default Search;
