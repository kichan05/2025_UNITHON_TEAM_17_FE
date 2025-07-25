import type {FC} from "react";
import {useEffect, useState} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {BottomNavigation} from "../../components/BottomNavigation";
import {AddLocationButton} from "./AddLocationButton"
import {LocationItem} from "./LocationItem"
import {ExpiringProduct} from "./ExpiringProduct";
import styled from "styled-components";
import {useWarehouse} from "../../hooks/useWarehouse";
import {Location} from "../../type/Warehouse";
import {useAuth} from "../../hooks/useAuth";

export const WarehousePage: FC = () => {
    const {user} = useAuth();
    const {getLocations} = useWarehouse();
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        getLocations().then(setLocations)
    }, [])

    return (
        <PageBackground>
            <PageLayout $isBottomNavigation>
                <PaddedLayout>
                    <HeaderWrapper>
                        <Title>내 창고</Title>
                    </HeaderWrapper>

                    <ExpiringProduct/>

                    {locations.map((location) => {
                        return (
                            <LocationItem
                                id={location.locationId}
                                key={location.name}
                                name={location.name}
                                description={location.description}
                                productCount={location.itemCount}
                                imageUrl={"https://keepbara.duckdns.org" + location.imagePath}
                            />
                        );
                    })}
                    <AddLocationButton/>
                    <BottomNavigation/>
                </PaddedLayout>
            </PageLayout>
        </PageBackground>
    );
};


const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
`;