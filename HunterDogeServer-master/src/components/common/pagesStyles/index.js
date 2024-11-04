import styled from "styled-components";

export const NftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
  max-width: 1161px;
  width: 100%;
  gap: 20px;
  
  @media (min-width: 1600px) {
    gap: 54px;
    padding: 0 50px;
  }
`

export const NftWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const NftTitle = styled.h2`
  font-size: 60px;
  text-align: center;
  margin-bottom: 41px;
`