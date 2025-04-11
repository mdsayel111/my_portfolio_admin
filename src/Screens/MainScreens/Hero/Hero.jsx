import {
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
import { CLUseNavigate, CLUseParams } from "@antopolis/admin-component-library/dist/helper";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { FaTextHeight } from "react-icons/fa6";
import CustomModal from "../../../Components/Partials/CustomModal/CustomModal";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  MANAGE_HERO_API,
} from "../../../Utilities/APIs/APIs";
import UpdateHero from "./UpdateHero";
import ViewHero from "./ViewHero";

// import ViewHero from "./ViewHero";

function Hero() {
  const axiosInstance = useAxiosInstance();
  const navigate = CLUseNavigate();
  const {
    setFilter,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    filter,
    toggle,
    toggleFilter,
    data,
    setData,
    target,
    toggleFilterValue,
    setToggleFilter,
    paginationState,
    setPaginationState,
    toggleFetch,
    setTarget,
    setArchiveModal,
    viewModal,
    setViewModal
  } = useEntityState();

  const { subLevelId } = CLUseParams();

  useEffect(() => {
    async function fetchData() {
      const { data: heroData, status } = await axiosInstance.get(
        `${MANAGE_HERO_API}`
      );
      if (status === 200) {
        setData(heroData?.data);
      } else {
        console.error("Failed to fetch Hero:");
      }
    }
    fetchData();
  }, [toggle, filter]);

  const headers = [
    { label: "Image" },
    // { label: "Title" },
    // { label: "Name" },
    // { label: "Description" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Hero"
        openModal={setCreateModal}
        modalLabel="Create New Hero"
        searchPlaceholder="Search Hero"
        hasModal={false}
        filterAndSearchProps={{
          filter,
          setFilter,
          hasSearch: false,
          hasFilter: false,
          toggleFilterValue,
          toggleFilter,
          setToggleFilter,
        }}
      />

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          <CLTableRow key={data?._id}>
          <CLTableImageCell
              url={data?.image}
              altText={'...'}
            />
            {/* <CLTableCell text={data?.title} />
            <CLTableCell text={data?.name} />
            <CLTableCell text={data?.description} /> */}
            <CLTableActionButtons
              target={data}
              hasView={true}
              hasEdit={true}
              hasArchive={false}
              editBtnProps={{ setEditModal, setTarget }}
              archiveBtnProps={{ setArchiveModal, setTarget }}
              viewBtnProps={{setViewModal, setTarget}}
                // extraAction
                // extraActions={[
                //   {
                //     onClick: () => {
                //       navigate(`/main/heroAnimationText/${data._id}`);
                //     },
                //     btnProps: {
                //       icon: FaTextHeight,
                //       tooltipText: "ANimation Text",
                //       toolTipContainerClassName:
                //         "!text-slate-500  hover:!bg-slate-500 hover:!text-white",
                //       toolTipClassName: "hover:!text-white ",
                //     },
                //   },
                // ]}                 
            />
          </CLTableRow>
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Hero"
        hasPagination={true}
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      {viewModal && (
        <CustomModal>
          <ViewHero target={target} setViewModal={setViewModal} />
        </CustomModal>
      )}

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Hero"} contentClassName="max-h-[70vh] overflow-auto" style={{height: "100vh"}}>
        <UpdateHero
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>
    </CardLayout>
  );
}

export default Hero;
