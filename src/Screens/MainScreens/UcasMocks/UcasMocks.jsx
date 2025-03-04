import {
  ArchiveModal,
  CLTable,
  CLTableActionButtons,
  CLTableBody,
  CLTableCell,
  CLTableFooter,
  CLTableHeader,
  CLTableRow,
  Header,
  Modal,
} from "@antopolis/admin-component-library/dist/elements";
import { useEntityState } from "@antopolis/admin-component-library/dist/hooks";
import { CardLayout } from "@antopolis/admin-component-library/dist/layout";
import { useEffect, useState } from "react";
import { useAxiosInstance } from "../../../Hooks/Instances/useAxiosInstance";
import {
  UNARCHIVE_UCAS_MOCKS_API,
  ARCHIVE_UCAS_MOCKS_API,
  MANAGE_UCAS_MOCKS_API,
} from "../../../Utilities/APIs/APIs";
import { da } from "date-fns/locale";

function UcasMocks() {
  const axiosInstance = useAxiosInstance();
  const [activeTab, setActiveTab] = useState("Grammar");

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
    archiveModal,
    setTotalPages,
    setTotalData,
  } = useEntityState();

  useEffect(() => {
    async function fetchData() {
      const { data, status } = await axiosInstance.get(
        `${MANAGE_UCAS_MOCKS_API}?filter=${filter}&type=${activeTab}`,
        {
          params: {
            page: paginationState.currentPage,
            limit: paginationState.limit,
          },
        }
      );
      if (status === 200) {
        setData(data?.ucasMocks);
        setTotalPages(data?.totalPages);
        setTotalData(data?.totalItems);
      } else {
        console.error("Failed to fetch Ucas & Mocks:");
      }
    }
    fetchData();
  }, [
    toggle,
    filter,
    paginationState.currentPage,
    paginationState.limit,
    activeTab,
  ]);

  console.log(data);

  const headers = [
    { label: "Full Name" },
    { label: "Email" },
    { label: "Phone" },
    { label: "Qualifications" },
    { label: "Subject" },
    { label: "Mock Type" },
  ];

  return (
    <CardLayout>
      <div className="flex justify-start items-center">
        <Header
          heading="Ucas & Mocks"
          openModal={setCreateModal}
          modalLabel="Export Data"
          searchPlaceholder="Search Mock"
          hasModal={false}
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
        <div className="relative">
          <div className="md:absolute md:top-[0.1rem] flex items-center justify-center bg-[#262626] p-1 space-x-1 rounded-lg text-sm font-medium">
            <button
              className={`px-4 py-[0.31rem] rounded-lg ${
                activeTab === "Grammar"
                  ? "bg-black text-white"
                  : "bg-transparent text-[#a5a5a5]"
              }`}
              onClick={() => setActiveTab("Grammar")}
            >
              Grammar
            </button>
            <button
              className={`px-4 py-[0.31rem] rounded-lg ${
                activeTab === "Paper"
                  ? "bg-black text-white"
                  : "bg-transparent text-[#a5a5a5]"
              }`}
              onClick={() => setActiveTab("Paper")}
            >
              Paper
            </button>
          </div>
        </div>
      </div>

      <CLTable>
        <CLTableHeader headers={headers} hasActions={true} />
        <CLTableBody>
          {data?.length > 0
            ? data.map((mock) => (
                <CLTableRow key={mock._id}>
                  <CLTableCell text={mock?.fullName} />
                  <CLTableCell text={mock?.email} />
                  <CLTableCell text={mock?.phone} />
                  <CLTableCell text={mock?.qualification} />
                  <CLTableCell text={mock?.subject} />
                  <CLTableCell text={mock?.mockType} />

                  <CLTableActionButtons
                    isActive={mock?.isActive}
                    target={mock}
                    hasView={false}
                    hasEdit={false}
                    editBtnProps={{ setEditModal, setTarget }}
                    archiveBtnProps={{ setArchiveModal, setTarget }}
                  />
                </CLTableRow>
              ))
            : null}
        </CLTableBody>
      </CLTable>
      <CLTableFooter
        dataLabel="Mocks"
        hasPagination={true}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        paginationDispatch={setPaginationState}
      />
      {archiveModal && (
        <ArchiveModal
          isOpen={archiveModal}
          onClose={() => setArchiveModal(false)}
          item={{
            ...target,
            name: target?._id,
          }}
          toggleFetch={toggleFetch}
          api={`${
            target.isActive ? ARCHIVE_UCAS_MOCKS_API : UNARCHIVE_UCAS_MOCKS_API
          }${target?._id}`}
          axiosInstance={axiosInstance}
          successMessage={`${target?.name} has been archived`}
          isArchive={target?.isActive}
          title={target?._id}
        />
      )}
    </CardLayout>
  );
}

export default UcasMocks;
