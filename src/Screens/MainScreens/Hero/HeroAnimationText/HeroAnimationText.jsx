import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableImageCell,
  CLTableRow,
  Header,
  Modal
} from "@antopolis/admin-component-library/dist/elements";
import { CLUseParams } from "@antopolis/admin-component-library/dist/helper";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { MANAGE_HERO_ANIMATION_TEXT_API } from "../../../../Utilities/APIs/APIs";
import UpdateHeroAnimationText from "./UpdateHeroAnimationText";
import CustomHeader from "../../../../Components/Partials/CustomHeader/CustomHeader";
import CreateHeroTextAnimation from "./CreateHeroTextAnimation";

// import ViewHeroAnimationText from "./ViewHeroAnimationText";

function HeroAnimationText() {
  const axiosInstance = useAxiosInstance();
  const {
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    filter,
    toggle,
    data,
    setData,
    target,
    paginationState,
    setPaginationState,
    toggleFetch,
    setTarget,
    setArchiveModal,
    setViewModal,
    archiveModal,
  } = useEntityState();

  const { subLevelId } = CLUseParams();

  useEffect(() => {
    async function fetchData() {
      const { data: heroAnimationTextData, status } = await axiosInstance.get(
        `${MANAGE_HERO_ANIMATION_TEXT_API}`
      );
      if (status === 200) {
        setData(heroAnimationTextData?.data);
      } else {
        console.error("Failed to fetch HeroAnimationText:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  console.log(data)

  const headers = [
    { label: "Text" },
  ];

  return (
    <CardLayout>
      <CustomHeader createModal={createModal} hasCreate={true} setCreateModal={setCreateModal} title={"Hero Animation Text"} />

      {console.log(createModal)}

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {
            data?.map((data) => <CLTableRow key={data?._id}>
            <CLTableCell text={data?.text} />
            <CLTableActionButtons
              target={data}
              hasView={true}
              hasEdit={true}
              hasArchive={true}
              editBtnProps={{ setEditModal, setTarget }}
              archiveBtnProps={{ setArchiveModal, setTarget }}
              viewBtnProps={{setViewModal, setTarget}}
            />
          </CLTableRow>)
          }
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Hero Animation Text"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create New Hero Text Animation"}
      >
        <CreateHeroTextAnimation
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update HeroAnimationText"} contentClassName="max-h-[70vh] overflow-auto" style={{height: "100vh"}}>
        <UpdateHeroAnimationText
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>

      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={target}
          toggleFetch={toggleFetch}
          api={`${MANAGE_HERO_ANIMATION_TEXT_API}${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`This project has been archived`}
          isArchive={target?.isActive}
          title={
            "Archive this Project"
          }
        />
      )}
    </CardLayout>
  );
}

export default HeroAnimationText;
