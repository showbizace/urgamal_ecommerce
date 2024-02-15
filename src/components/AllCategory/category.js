// import { Collapse, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import { rem } from "@mantine/core";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { useState } from "react";

const Category = ({ padding }) => {
  const router = useRouter();
  const { catId } = router.query;
  const categories = useCategories();
  const [selectParent, setSelectParent] = useState(new Set([""]));
  const [selectChild, setSelectChild] = useState(new Set([""]));
  const itemClasses = {
    base: "pl-2 w-full rounded-lg data-[open=true]:bg-[#F9FAFB]",
    title:
      "font-open text-[1.1rem] data-[open=true]:text-[#F9BC60] data-[hover=true]:text-[#FD7E14]",
    trigger:
      "data-[hover=true]:text-[#ffffff] px-2 py-0 rounded-lg h-14 flex items-center data-[focus-visible=true]:outline-0 focus:outline-none data-[open=true]:font-bold",
    indicator:
      "text-medium data-[open=true]:text-[#F9BC60] data-[open=true]:rotate-90",
    content: "text-small px-2",
  };
  const childItemClasses = {
    base: "px-0 py-0 w-full",
    title: "font-open text-medium data-[open=true]:text-[#F9BC60]",
    trigger:
      "rounded-lg h-14 flex items-center data-[focus-visible=true]:outline-0 focus:outline-none data-[open=true]:font-bold",
    indicator:
      "text-medium data-[open=true]:text-[#F9BC60] data-[open=true]:rotate-90",
    content: "pl-4 text-small",
  };

  return (
    <div className="font-open pt-2 rounded-md bg-white max-h-screen xl:block lg:block md:block z-10 w-full lg:min-w-[300px] lg:w-[350px] lg:max-w-[450px] lg:overflow-y-auto">
      <Accordion
        showDivider={false}
        itemClasses={itemClasses}
        selectedKeys={selectParent}
        onSelectionChange={setSelectParent}
      >
        {categories &&
          categories?.categories?.map((el, index) => {
            return (
              <AccordionItem
                classNames="p-0"
                key={index}
                aria-label={el?.name}
                indicator={<IconChevronRight key={index} size={rem(20)} />}
                title={<span key={index}>{el?.name}</span>}
                startContent={
                  el?.icon && (
                    <Image
                      alt="category-icon"
                      src={el.icon}
                      width={34}
                      height={34}
                    />
                  )
                }
                onPress={() => {
                  router.push(
                    {
                      pathname: `/category/${el.id}`,
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
              >
                {el?.secondary_cats &&
                  el?.secondary_cats.map((el, index) => {
                    return (
                      <Accordion
                        key={index}
                        showDivider={true}
                        itemClasses={childItemClasses}
                        selectedKeys={selectChild}
                        onSelectionChange={setSelectChild}
                      >
                        <AccordionItem
                          key={index.toString()}
                          aria-label={el?.name}
                          indicator={
                            <IconChevronRight key={index} size={rem(20)} />
                          }
                          title={<span key={index}>{el?.name}</span>}
                          startContent={
                            el?.icon && (
                              <Image
                                alt="category-icon"
                                src={el?.icon}
                                width={24}
                                height={24}
                              />
                            )
                          }
                          onPress={() => {
                            router.push(
                              {
                                pathname: `/category/${el.id}`,
                              },
                              undefined,
                              { shallow: true }
                            );
                          }}
                        >
                          <div
                            title={el?.name}
                            key={index}
                            className="pl-5 py-1 overflow-auto scrollbar-hide flex flex-row justify-between cursor-pointer"
                          >
                            <span
                              onClick={() => {
                                router.push(
                                  {
                                    pathname: `/category/${el.id}`,
                                  },
                                  undefined,
                                  { shallow: true }
                                );
                              }}
                            >
                              {el?.name}
                            </span>
                          </div>
                        </AccordionItem>
                      </Accordion>
                    );
                  })}
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
};

// const RTCategory = ({ padding }) => {
//   const router = useRouter();
//   const { catId } = router.query;
//   const categories = useCategories();
//   return (
//     <div
//       id="category-menu"
//       className={
//         "rounded-md bg-white overflow-y-auto max-h-screen xl:block lg:block md:block sm:hidden xs2:hidden xs:hidden z-10 min-w-[350px] w-[350px] max-w-[350px]"
//       }
//     >
//       <Container
//         style={{
//           borderRadius: "5px !important",
//           boxShadow: "none",
//           padding: "1rem",
//           padding: padding ? padding : "0px",
//           height: "100%",
//         }}
//         key={"grid-container"}
//       >
//         <div className="h-full">
//           <div className="flex flex-row justify-between w-full">
//             <p className="text-xl font-semibold">Бүх ангилал</p>
//           </div>
//           <Grid
//             style={{
//               width: "100%",
//               height: "100%",
//               marginTop: 20,
//               overflowY: "auto",
//             }}
//             grow
//             gutter="xs"
//           >
//             <Accordion
//               divider={false}
//               accordion={false}
//               css={{
//                 marginTop: "0px",
//                 paddingTop: 0,
//                 paddingBottom: "0.6rem",
//                 paddingRight: 0,
//                 paddingLeft: 0,
//                 height: "100%",
//               }}
//             >
//               {categories &&
//                 categories?.categories?.map((el, index) => {
//                   return (
//                     <AccordionItem
//                       key={el?.id}
//                       // id={el?.id}
//                       // css={{
//                       //   paddingLeft: "$5",
//                       //   paddingRight: "$5",
//                       //   borderRadius: "$lg",
//                       // }}
//                       // tabIndex={2}
//                       // arrowIcon={[
//                       //   <IconChevronRight color="#fcbc60" key={index} />,
//                       // ]}
//                       // title={[
//                       //   <div className="flex flex-row gap-2" key={index}>
//                       //     {el?.icon && (
//                       //       <Image
//                       //         alt="category-icon"
//                       //         src={el.icon}
//                       //         width={24}
//                       //         height={24}
//                       //       />
//                       //     )}
//                       //     <p
//                       //       className={`hover:text-[#fd7e14] ${
//                       //         catId === el.id && "font-semibold"
//                       //       }`}
//                       //       key={index}
//                       //     >
//                       //       {el.name}
//                       //     </p>
//                       //   </div>,
//                       // ]}
//                       // onClick={() => {
//                       //   router.push({
//                       //     pathname: `/category/${el.id}`,
//                       //   });
//                       // }}
//                       // expanded={() => {
//                       //   if (catId) {
//                       //     if (catId === el.id) {
//                       //       return true;
//                       //     } else {
//                       //       return false;
//                       //     }
//                       //   } else {
//                       //     return false;
//                       //   }
//                       // }}
//                     >
//                       {el?.child_cats &&
//                         el?.child_cats.map((el, index) => (
//                           <AccordionItem
//                             key={el?.id}
//                             id={el?.id}
//                             css={{
//                               paddingLeft: "$5",
//                               paddingRight: "$5",
//                               borderRadius: "$lg",
//                             }}
//                             tabIndex={2}
//                             arrowIcon={[
//                               <IconChevronRight color="#fcbc60" key={index} />,
//                             ]}
//                             title={[
//                               <p className="hover:text-[#fd7e14]" key={index}>
//                                 {el?.name}
//                               </p>,
//                             ]}
//                           >
//                             <div className="overflow-auto scrollbar-hide">
//                               {/* {child !== undefined &&
//                                 child.map((item, index) => {
//                                   if (el.id === item.parent_id) {
//                                     return (
//                                       <Text
//                                         key={index}
//                                         className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
//                                         onClick={() => {
//                                           router.push({
//                                             pathname: `/category/child/${item.id}`,
//                                           });
//                                         }}
//                                       >
//                                         {item.name}
//                                       </Text>
//                                     );
//                                   }
//                                 })} */}
//                             </div>
//                           </AccordionItem>
//                         ))}
//                       {/* <div className="overflow-auto scrollbar-hide">
//                           {child !== undefined &&
//                             child.map((item, index) => {
//                               if (el.id === item.parent_id) {
//                                 return (
//                                   <Text
//                                     key={index}
//                                     className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
//                                     onClick={() => {
//                                       router.push({
//                                         pathname: `/category/child/${item.id}`,
//                                       });
//                                     }}
//                                   >
//                                     {item.name}
//                                   </Text>
//                                 );
//                               }
//                             })}
//                         </div> */}
//                     </AccordionItem>
//                   );
//                 })}
//               {/* {parent !== undefined &&
//                   parent
//                     .filter(
//                       (e) =>
//                         e.main_cat_id.toString() === userConfigs.preferenceConfig
//                     )
//                     .map((el, index) => {
//                       return (
//                         <Collapse
//                           key={index}
//                           id="2"
//                           css={{
//                             paddingLeft: "$5",
//                             paddingRight: "$5",
//                             borderRadius: "$lg",
//                           }}
//                           tabIndex={2}
//                           arrowIcon={[
//                             <IconChevronRight color="#fcbc60" key={index} />,
//                           ]}
//                           title={[
//                             <p
//                               className="hover:text-[#fd7e14] font-semibold"
//                               key={index}
//                             >
//                               {el.name}
//                             </p>,
//                           ]}
//                           expanded={() => {
//                             if (
//                               selectedCategoryType &&
//                               selectedCategoryType === "parent"
//                             ) {
//                               return el.id === selectedCategoryId;
//                             }
//                              else if (
//                               selectedCategoryType &&
//                               selectedCategoryType === "child"
//                             )
//                             {
//                               const found = child.find(
//                                 (e) => e.id == selectedCategoryId
//                               );
//                               if (found && found.parent_id === el.id) {
//                                 return true;
//                               }
//                               return false;
//                             }
//                             else {
//                               return false;
//                             }
//                           }}
//                         >
//                           <div className="overflow-auto scrollbar-hide">
//                             {child !== undefined &&
//                               child.map((item, index) => {
//                                 if (el.id === item.parent_id) {
//                                   return (
//                                     <Text
//                                       key={index}
//                                       className="w-full p-4 cursor-pointer hover:font-medium hover:underline"
//                                       onClick={() => {
//                                         router.push({
//                                           pathname: `/category/child/${item.id}`,
//                                         });
//                                       }}
//                                     >
//                                       {item.name}
//                                     </Text>
//                                   );
//                                 }
//                               })}
//                           </div>
//                         </Collapse>
//                       );
//                     })} */}
//             </Accordion>
//           </Grid>
//         </div>
//       </Container>
//     </div>
//   );
// };

export default Category;
