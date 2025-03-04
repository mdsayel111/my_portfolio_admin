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
  Modal,
} from "@antopolis/admin-component-library/dist/elements";
import {
  toast,
  useEntityState,
} from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect } from "react";
import { useAxiosInstance } from "../../../../Hooks/Instances/useAxiosInstance";
import { HERO_SLIDERS_API, IMAGE_URL } from "../../../../Utilities/APIs/APIs";
import CreateHeroSlider from "./CreateHeroSlider";
import UpdateHeroSlider from "./UpdateHeroSlider";
import { ViewDetailsModal } from "../../../../Components/ViewDetailsModal/ViewDetailsModal";

function HeroSliders() {
  const axiosInstance = useAxiosInstance();
  const {
    data,
    setData,
    setFilter,
    setEditModal,
    editModal,
    createModal,
    setCreateModal,
    archiveModal,
    setArchiveModal,
    filter,
    toggleFilter,
    toggleFilterValue,
    setToggleFilter,
    target,
    setTarget,
    toggleFetch,
    toggle,
    paginationState,
    setPaginationState,
    setTotalPages,
    setTotalData,
    viewModal,
    setViewModal,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data: heroSliderData, status } = await axiosInstance.get(
        `${HERO_SLIDERS_API}?filter=${filter}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(heroSliderData);
        setTotalPages(heroSliderData?.totalPages);
        setTotalData(heroSliderData?.totalItems);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to fetch hero slider data`,
        });
      }
    }
    fetchData();
  }, [toggle, filter]);

  console.log("Heror slider Data", data);

  const headers = [
    { label: "Image", className: "min-w-24" },
    { label: "Precedence", className: "min-w-36 max-lg:hidden" },
    // { label: "Actions", className: "min-w-24" },
  ];

  return (
    <CardLayout>
      <Header
        heading="Hero Sliders"
        openModal={setCreateModal}
        modalLabel="Create New Hero Slider"
        searchPlaceholder="Search Hero Slider"
        filterAndSearchProps={{
          filter,
          setFilter,
          hasSearch: false,
          hasFilter: true,
          toggleFilterValue,
          toggleFilter,
          setToggleFilter,
        }}
      />

      <CLTable containerClassName="" tableClassName="">
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody className="">
          {data?.length > 0 &&
            data.map((item, index) => (
              <CLTableRow key={index} className="">
                <CLTableImageCell
                  className={"size-20"}
                  url={IMAGE_URL + item?.image}
                />
                <CLTableCell className="" text={item?.precedence} />
                <CLTableActionButtons
                  isActive={item.isActive || true}
                  target={item}
                  hasView={true}
                  viewBtnProps={{ setViewModal, setTarget }}
                  editBtnProps={{ setEditModal, setTarget }}
                  archiveBtnProps={{ setArchiveModal, setTarget }}
                />
              </CLTableRow>
            ))}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Course"
        paginationState={paginationState}
        paginationDispatch={setPaginationState}
      />

      <Modal
        isOpen={createModal}
        onClose={setCreateModal}
        title={"Create Hero Slider"}
      >
        <CreateHeroSlider
          setCreateModal={setCreateModal}
          toggleFetch={toggleFetch}
        />
      </Modal>

      <Modal isOpen={editModal} onClose={setEditModal} title={"Update Course"}>
        <UpdateHeroSlider
          setEditModal={setEditModal}
          id={target?._id}
          toggleFetch={toggleFetch}
        />
      </Modal>

      {viewModal && (
        <ViewDetailsModal
          isOpen={viewModal}
          onClose={() => setViewModal(false)}
          item={"hero slider"}
          api={`${HERO_SLIDERS_API}getSingleHeroSlider/${target?._id}`}
          axiosInstance={axiosInstance}
          title={" Hero Slider Details"}
          setData={setData}
          data={data}
          toggleFetch={toggleFetch}
        />
      )}

      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{...target, name: target?.name}}
          toggleFetch={toggleFetch}
          api={`${HERO_SLIDERS_API}archiveHeroSlider/${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?.courseName}
        />
      )}
    </CardLayout>
  );
}

export default HeroSliders;
