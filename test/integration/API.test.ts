import axios from "axios";

test("`GET /boards, retorna os quadros`", async function(){
    const response = await axios({
        url: "http://localhost:3000/boards",
        method: "get"
    });
    const boards = response.data;
    expect(boards).toHaveLength(3);
});