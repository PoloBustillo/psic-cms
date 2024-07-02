import React, { useEffect, useState } from "react";
import {
  Box,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  Entity,
  EntityCustomViewParams,
  EntityReference,
  EntityValues,
  ErrorView,
  Markdown,
  useDataSource,
  useStorageSource,
} from "firecms";
import { BlogEntryType } from "../types/BlogEntryType";

export function BlogEntryPreview({
  modifiedValues,
}: EntityCustomViewParams<BlogEntryType>) {
  const storage = useStorageSource();
  const [headerUrl, setHeaderUrl] = useState<string | undefined>();

  useEffect(() => {
    if (modifiedValues?.header_image) {
      storage
        .getDownloadURL(modifiedValues.header_image)
        .then((res) => setHeaderUrl(res.url));
    }
  }, [storage, modifiedValues?.header_image]);

  return (
    <Box>
      {headerUrl && (
        <img
          alt={"Header"}
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
          }}
          src={headerUrl}
        />
      )}

      <Container
        maxWidth={"sm"}
        sx={{
          mt: 4,
          justifyItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {modifiedValues?.name && (
          <Typography
            variant={"h3"}
            sx={{
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            {modifiedValues.name}
          </Typography>
        )}
      </Container>

      {modifiedValues?.content &&
        modifiedValues.content
          .filter((e: any) => !!e)
          .map((entry: any, index: number) => {
            if (entry.type === "text")
              return (
                <Text
                  key={`preview_text_${index}`}
                  markdownText={entry.value}
                />
              );
            if (entry.type === "images")
              return (
                <Images
                  key={`preview_images_${index}`}
                  storagePaths={entry.value}
                />
              );
            if (entry.type === "products")
              return (
                <></>
                // <ProductGroupPreview
                //   key={`preview_products_${index}`}
                //   references={entry.value}
                // />
              );
            if (entry.type === "quote")
              return (
                <Quote key={`preview_quote_${index}`} quoteText={entry.value} />
              );
            return (
              <ErrorView
                key={`preview_images_${index}`}
                error={"Unexpected value in blog entry"}
              />
            );
          })}
    </Box>
  );
}

export function Images({ storagePaths }: { storagePaths: string[] }) {
  if (!storagePaths) return <></>;
  return (
    <Container
      maxWidth={"md"}
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      <Box display="flex">
        {storagePaths.map((path, index) => (
          <Box
            p={2}
            m={1}
            key={`images_${index}`}
            sx={{
              width: 300,
              height: 300,
            }}
          >
            <StorageImage storagePath={path} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export function StorageImage({ storagePath }: { storagePath: string }) {
  const storage = useStorageSource();
  const [url, setUrl] = useState<string | undefined>();
  useEffect(() => {
    if (storagePath) {
      storage.getDownloadURL(storagePath).then((res) => setUrl(res.url));
    }
  }, [storage, storagePath]);

  if (!storagePath) return <></>;

  return (
    <img
      alt={"Generic"}
      style={{
        objectFit: "contain",
        width: "100%",
        height: "100%",
      }}
      src={url}
    />
  );
}

function Text({ markdownText }: { markdownText: string }) {
  if (!markdownText) return <></>;

  return (
    <Container maxWidth={"sm"}>
      <Box mt={6} mb={6}>
        <Markdown source={markdownText} />
      </Box>
    </Container>
  );
}

// function ProductGroupPreview({
//   references,
// }: {
//   references: EntityReference[];
// }) {
//   const [products, setProducts] = useState<Entity<Product>[] | undefined>();
//   const dataSource = useDataSource();

//   /**
//    * Fetch the products determined by the references, using the datasource
//    * and the products collection
//    */
//   useEffect(() => {
//     if (references) {
//       Promise.all(
//         references.map((ref) =>
//           dataSource.fetchEntity({
//             path: ref.path,
//             entityId: ref.id,
//             collection: productsCollection,
//           })
//         )
//       )
//         .then((results) => results.filter((r) => !!r) as Entity<Product>[])
//         .then((results) => setProducts(results));
//     }
//   }, [references, dataSource]);

//   if (!references) return <></>;

//   if (!products) return <CircularProgress />;

//   return (
//     <Container
//       maxWidth={"lg"}
//       sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
//     >
//       {products.map((p, index) => (
//         // <ProductPreview
//         //   key={`products_${index}`}
//         //   productValues={p.values as EntityValues<Product>}
//         // />
//       ))}
//     </Container>
//   );
// }

// export function ProductPreview({
//   productValues,
// }: {
//   productValues: EntityValues<Product>;
// }) {
//   if (!productValues) return <></>;

//   return (
//     <Paper
//       sx={{
//         width: "300px",
//         // height: "300px",
//         margin: "16px",
//         boxShadow: "rgb(0 0 0 / 8%) 0px 8px 12px -4px",
//       }}
//       variant={"outlined"}
//     >
//       <CardActionArea>
//         <CardContent
//           sx={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             flexGrow={1}
//             flexShrink={1}
//             flexBasis={296}
//             p={2}
//             maxHeight={296}
//           >
//             <StorageImage storagePath={productValues.main_image} />
//           </Box>
//           <Typography
//             gutterBottom
//             variant="h6"
//             noWrap
//             style={{
//               marginTop: "16px",
//             }}
//           >
//             {productValues.name}
//           </Typography>

//           <Typography variant="body2" color="textSecondary" component="div">
//             {productValues.price} {productValues.currency}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Paper>
//   );
// }

function Quote({ quoteText }: { quoteText: string }) {
  if (!quoteText) return <></>;

  return (
    <Container maxWidth={"sm"} sx={{ borderLeft: "2px solid gray" }}>
      <Box mt={6} mb={6}>
        <Typography variant="h5" sx={{ fontStyle: "italic" }}>
          {quoteText}
        </Typography>
      </Box>
    </Container>
  );
}
