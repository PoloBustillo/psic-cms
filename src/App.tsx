import { GoogleAuthProvider } from "firebase/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import {
  buildCollection,
  CircularProgressCenter,
  createCMSDefaultTheme,
  FirebaseAuthController,
  FirebaseLoginView,
  FireCMS,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildModeController,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  useValidateAuthenticator,
} from "firecms";
import { messageCollection } from "./collections/MensajeCollection";
import { sitiosCollection } from "./collections/SitiosCollection";
import { terapiasCollection } from "./collections/TerapiasCollection";
import { bannerCollection } from "./collections/BannerCollection";
import { preguntasCollection } from "./collections/PreguntasCollection";
import { informacionPersonal } from "./collections/InformacionPersonal";
import { carouselCollection } from "./collections/CarouselCollection";
import { paginaConfigCollection } from "./collections/PageConfigCollection";
import { usersCollection } from "./collections/UsersCollection";
import { blogCollection } from "./collections/BlogCollection";
import { blogsCollection } from "./collections/BlogsMainCollection";
import { commentsCollection } from "./collections/CommentsCollection";
import { tasksCollection } from "./collections/TaskCollection";
import { tareasPreguntasCollection } from "./collections/TareaPreguntas";
import { formulariosTareasCollection } from "./collections/FormularioTareaCollection";
import { respuestasCollection } from "./collections/RespuestasCollection";
import { tareasUsuarioRespuestasCollection } from "./collections/TareaUsuarioRespuestas";

// TODO: Replace with your config
const firebaseConfig = {
  apiKey: "AIzaSyCSghawB4Sdi4gUEi6j1NPrHLPWqFF_M8E",
  authDomain: "pisc-cms.firebaseapp.com",
  projectId: "pisc-cms",
  storageBucket: "pisc-cms.appspot.com",
  messagingSenderId: "270454145850",
  appId: "1:270454145850:web:40303bb3b6bd804390c603",
};

const DEFAULT_SIGN_IN_OPTIONS = [GoogleAuthProvider.PROVIDER_ID];

/**
 * This is an example of how to use the components provided by FireCMS for
 * a better customisation.
 * @constructor
 */
export default function App() {
  const signInOptions = DEFAULT_SIGN_IN_OPTIONS;

  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
  } = useInitialiseFirebase({ firebaseConfig });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const dataSource = useFirestoreDataSource({
    firebaseApp,
    // You can add your `FirestoreTextSearchController` here
  });

  const storageSource = useFirebaseStorageSource({ firebaseApp });

  const modeController = useBuildModeController();

  const theme = createCMSDefaultTheme({ mode: modeController.mode });

  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController,
      authentication: async ({ user }) => {
        if (
          !user?.email?.includes("leopoldobeguiluz1@gmail.com") &&
          !user?.email?.includes("psic.danieladiazmer@gmail.com")
        ) {
          return false;
        }

        console.log("Allowing access to", user?.email);
        // This is an example of retrieving async data related to the user
        // and storing it in the user extra field.
        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);
        return true;
      },
      dataSource,
      storageSource,
    });

  if (configError) {
    return <div> {configError} </div>;
  }

  if (firebaseConfigError) {
    return (
      <div>
        It seems like the provided Firebase config is not correct. If you are
        using the credentials provided automatically by Firebase Hosting, make
        sure you link your Firebase app to Firebase Hosting.
      </div>
    );
  }

  if (firebaseConfigLoading || !firebaseApp || authLoading) {
    return <CircularProgressCenter />;
  }

  return (
    <Router>
      <ModeControllerProvider value={modeController}>
        <SnackbarProvider>
          <FireCMS
            authController={authController}
            collections={[
              paginaConfigCollection,
              messageCollection,
              sitiosCollection,
              terapiasCollection,
              informacionPersonal,
              carouselCollection,
              preguntasCollection,
              usersCollection,
              blogsCollection,
              blogCollection,
              commentsCollection,
              tasksCollection,
              bannerCollection,
              tareasPreguntasCollection,
              formulariosTareasCollection,
              respuestasCollection,
              tareasUsuarioRespuestasCollection,
            ]}
            dataSource={dataSource}
            storageSource={storageSource}
            entityLinkBuilder={({ entity }) =>
              `https://console.firebase.google.com/project/${firebaseApp.options.projectId}/firestore/data/${entity.path}/${entity.id}`
            }
          >
            {({ context, loading }) => {
              let component;
              if (loading || authLoading) {
                component = <CircularProgressCenter />;
              } else if (!canAccessMainView) {
                component = (
                  <FirebaseLoginView
                    notAllowedError={
                      notAllowedError ? "No tiene permisos para entrar" : ""
                    }
                    additionalComponent={
                      <>Dashboard usado por la Psicologa Daniela Diaz</>
                    }
                    logo={"/logo500.webp"}
                    allowSkipLogin={false}
                    signInOptions={signInOptions}
                    firebaseApp={firebaseApp}
                    authController={authController}
                  />
                );
              } else {
                component = (
                  <Scaffold name={"Psicologa"} logo={"/logo500.webp"}>
                    <NavigationRoutes />
                    <SideDialogs />
                  </Scaffold>
                );
              }

              return (
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {component}
                </ThemeProvider>
              );
            }}
          </FireCMS>
        </SnackbarProvider>
      </ModeControllerProvider>
    </Router>
  );
}
