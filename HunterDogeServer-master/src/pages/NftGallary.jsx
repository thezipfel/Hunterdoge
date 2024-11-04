import React, {useState} from 'react';
import CardNft from "../components/card";
import {NftContainer, NftTitle, NftWrapper} from '../components/common/pagesStyles'

import nft_1 from '../images/NFT/1. NFT_HunterChasingHotDog(e)s.gif';
import nft_2 from '../images/NFT/2. NFT_HunterLostInSpace.gif';
import nft_3 from '../images/NFT/3. NFT_HunterReadyForTheRace.gif';
import {paginate} from "../components/pagination/paginate";
import Pagination from "../components/pagination/Pagination";

const data = [nft_1, nft_2, nft_3]

const NftGallery = () => {
    const [page, setPage] = useState(1)
    const res = paginate(data.length, page, 9, data)
    const {newData, currentPage, endPage} = res

    return (
        <div>
            <NftTitle>Hunter’s nfts</NftTitle>
            <NftContainer>
                {newData.map((value, idx) => (
                    <NftWrapper key={idx}>
                        <CardNft image={value}/>
                    </NftWrapper>
                ))}
            </NftContainer>
            <Pagination start={currentPage} end={endPage} pageHandler={setPage} page={page}/>
        </div>
    );
};

export default NftGallery;
