import React from 'react';
import './Cast.css';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import { STATUS } from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.png';
import Image from '../../../components/LazyloadImage/Image';

const Cast = ({data, status}) => {
    const {url} = useSelector(state => state.home);
    const skeleton = () => {
        return(
            <div className='skItem'>
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    };
  return (
    <div className='castSection'>
        <ContentWrapper>
            <div className="sectionHeading">Top Cast</div>
            {
                status === STATUS.LOADING ? (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                ):
                (
                    <div className="listItems">
                        {
                            data?.map((item) => {
                                const profileImg = item?.profile_path ? url + item?.profile_path : avatar;
                                return(
                                    <div className="listItem" key={item.id}>
                                        <div className="profileImg">
                                            <Image src={profileImg}/>
                                        </div>
                                        <div className="name">{item?.name}</div>
                                        <div className="charecter">{item?.charecter}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Cast