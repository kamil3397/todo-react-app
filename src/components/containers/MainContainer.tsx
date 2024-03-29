import styled from "styled-components";

const imageURL = "https://source.unsplash.com/random";

export const MainContainer = styled.div`
background-image: url(${imageURL});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`