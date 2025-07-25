import {useState} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {NavHeader} from "../../components/NavHeader";
import styled from "styled-components";
import {FiImage} from "react-icons/fi";
import {Route, useNavigate} from "react-router-dom";
import {RoutePath} from "../../RoutePath";
import {useWarehouse} from "../../hooks/useWarehouse";
import {CreateLocationMakeReq} from "../../type/Warehouse";
import {usePreviewImage} from "../../hooks/UsePreviewImage";


const PaddedLayout = styled(PageLayout)`
  padding: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ImageCircle = styled.label`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
  overflow: hidden;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Label = styled.div`
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 2rem;
`;

const FieldLabel = styled.label`
  width: 100%;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 95%;
  padding: 1rem;
  font-size: 1rem;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 95%;
  height: 180px;
  padding: 1rem;
  font-size: 1rem;
  border: 1.5px solid #111;
  border-radius: 10px;
  resize: none;
`;

export const AddLocationPage = () => {
    const navigate = useNavigate();
    const {createLocation} = useWarehouse();

    const {file : image, onFileChange, previewUrl} = usePreviewImage(null)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleComplete = async () => {
        if (!name.trim()) {
            alert("장소 이름을 입력해주세요.");
            return;
        }

        if(image === null) {
            alert("이미지를 선택하세요")
            return
        }

        try {
            const req: CreateLocationMakeReq = {name, image, description};
            const res = await createLocation(req);
            console.log(res)
            navigate(RoutePath.warehouse)
        } catch (error) {
            alert("장소 생성에 실패했습니다. 다시 시도해주세요.");
            return;
        }
    };

    return (
        <PageBackground>
            <PageLayout>
                <NavHeader title="장소 입력" rightIcon="완료" onRightClick={handleComplete}/>
                <PaddedLayout>
                    <Wrapper>
                        <ImageCircle htmlFor="image-upload">
                            {previewUrl ? <PreviewImage src={previewUrl} alt="preview"/> :
                                <FiImage size={40} color="#aaa"/>}
                        </ImageCircle>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={onFileChange}
                            style={{display: "none"}}
                        />
                        <Label htmlFor="image-upload" as="label" style={{cursor: "pointer"}}>
                            사진 추가
                        </Label>

                        <FieldLabel>장소 이름</FieldLabel>
                        <Input
                            placeholder="예: 냉장고, 거실..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <TextArea
                            placeholder="장소에 대한 설명을 작성해주세요"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Wrapper>
                </PaddedLayout>
            </PageLayout>
        </PageBackground>
    );
};
