import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { createContext, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Link, useLocation, Navigate, useParams, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies, CookiesProvider } from "react-cookie";
import { useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Balancer from "react-wrap-balancer";
import { CaretRight, Spinner, CaretLeft, ShareNetwork, X, Globe, ArrowSquareOut, Check, Clipboard, Plus, Trash, PencilSimple } from "@phosphor-icons/react";
import axios from "axios";
import { jwtVerify } from "jose";
import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Dialog from "@radix-ui/react-dialog";
import * as Switch from "@radix-ui/react-switch";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
function LandingPage() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "flex px-8 h-20 justify-between items-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "font-bold text-zinc-900 text-2xl tracking-tight",
          children: "unilink"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/signin",
            className: "text-zinc-700 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 transition-colors flex items-center",
            children: "Sign in"
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/signup",
            className: "text-zinc-200 font-medium tracking-tight text-lg h-10 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex gap-2 items-center justify-center",
            children: [
              "Get started ",
              /* @__PURE__ */ jsx(CaretRight, { size: 14 })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "h-[calc(100vh_-_80px)] w-[60vw] mx-auto flex gap-20 items-center   justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-fit flex-col -mt-[100px] gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "font-bold text-zinc-900 text-6xl tracking-tight leading-tight", children: /* @__PURE__ */ jsxs(Balancer, { children: [
            "Streamline and",
            " ",
            /* @__PURE__ */ jsx("span", { className: "bg-zinc-900 text-zinc-50 px-3", children: "boost" }),
            /* @__PURE__ */ jsx("br", {}),
            "your online presence"
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-500 text-xl", children: /* @__PURE__ */ jsx(Balancer, { children: "Share all your social media profiles with just one link. Simplify and streamline your online presence effortlessly." }) })
        ] }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            className: "flex relative items-center w-full h-16 text-lg font-medium text-zinc-700 rounded-xl shadow-sm shadow-gray-200",
            action: "/signup",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "w-full h-full rounded-xl px-4 outline-none",
                  name: "email",
                  placeholder: "Enter email address",
                  autoComplete: "off",
                  "aria-autocomplete": "none"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "submit",
                  className: "absolute right-2 h-[80%] bg-zinc-800 text-zinc-200 min-w-max px-4 rounded-xl cursor-pointer",
                  value: "Register Now"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/lp-demo.png",
          alt: "unilink",
          className: "h-[80%] w-auto"
        }
      )
    ] })
  ] });
}
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [cookies, setCookie] = useCookies(["authorization"]);
  const [user, setUser] = useState(null);
  function updateAccessToken(newAccessToken) {
    setIsAuthenticated(!!newAccessToken);
    setAccessToken(newAccessToken);
    setCookie("authorization", newAccessToken);
  }
  useEffect(() => {
    setAccessToken(cookies.authorization);
    setIsAuthenticated(!!cookies.authorization);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    async function execute() {
      const secret = new TextEncoder().encode("shhhhhhh");
      const { payload: data } = await jwtVerify(accessToken, secret);
      setUser(data);
      if (!data) {
        setAccessToken(null);
        setCookie("authorization", null);
      }
      setIsFetchingUser(false);
    }
    execute();
  }, [accessToken]);
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        updateAccessToken,
        accessToken,
        isAuthenticated,
        user
      },
      children: (isAuthenticated ? !isFetchingUser && !isLoading : !isLoading) ? children : /* @__PURE__ */ jsx("div", { className: "flex w-screen h-screen items-center justify-center", children: /* @__PURE__ */ jsx(
        Spinner,
        {
          className: "text-zinc-900 animate-spin",
          size: 24,
          weight: "bold"
        }
      ) })
    }
  );
}
const useAuth = () => useContext(AuthContext);
AuthProvider.propTypes = {
  children: PropTypes.node
};
AuthProvider.defaultProps = {
  children: null
};
function SignupPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [password, setPassword] = useState("");
  const { updateAccessToken, isAuthenticated } = useAuth();
  const registerMutation = useMutation({
    mutationFn: async (user) => {
      const { data } = await api.post("/auth/signup", user);
      updateAccessToken(data.access_token);
    }
  });
  function handleRegisterSubmit(e) {
    e.preventDefault();
    registerMutation.mutate({
      username,
      display_name: displayName,
      email,
      password
    });
  }
  useEffect(() => {
    setEmail(params.get("email"));
  }, []);
  if (isAuthenticated)
    return /* @__PURE__ */ jsx(Navigate, { to: "/app" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("header", { className: "absolute px-4 md:px-8 mt-8 top-0", children: /* @__PURE__ */ jsxs(
      "a",
      {
        className: "text-zinc-700 font-bold flex items-center gap-1 text-lg hover:text-zinc-900 transition-colors",
        href: "/",
        children: [
          /* @__PURE__ */ jsx(CaretLeft, { size: 16, weight: "bold" }),
          " Home"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-start flex-col px-4",
        onSubmit: handleRegisterSubmit,
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-zinc-900 font-bold text-2xl tracking-tight", children: "Sign up to unilink" }),
          /* @__PURE__ */ jsxs("p", { className: "text-zinc-500 text-lg pb-4", children: [
            "Already have an account?",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/signin", className: "text-blue-400", children: "Sign in" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Username" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500",
                type: "text",
                placeholder: "johndoe",
                onChange: (e) => setUsername(e.target.value),
                value: username
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Display name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500",
                type: "text",
                placeholder: "John Doe",
                onChange: (e) => setDisplayName(e.target.value),
                value: displayName
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500",
                type: "email",
                placeholder: "john.doe@example.com",
                onChange: (e) => setEmail(e.target.value),
                value: email
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-400",
                type: "password",
                placeholder: "••••••••",
                onChange: (e) => setPassword(e.target.value),
                value: password
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "bg-zinc-900 w-full h-10 rounded-md flex text-zinc-200 items-center justify-center gap-1 leading-none font-medium",
              type: "submit",
              children: !registerMutation.isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Continue",
                " ",
                /* @__PURE__ */ jsx(
                  CaretRight,
                  {
                    className: "text-zinc-400",
                    size: 16,
                    weight: "bold"
                  }
                )
              ] }) : /* @__PURE__ */ jsx(
                Spinner,
                {
                  className: "text-zinc-200 animate-spin",
                  size: 18,
                  weight: "bold"
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateAccessToken, isAuthenticated } = useAuth();
  const loginMutation = useMutation({
    mutationFn: async (user) => {
      const { data } = await api.post("/auth/signin", user);
      updateAccessToken(data.access_token);
    }
  });
  function handleLoginSubmit(e) {
    e.preventDefault();
    loginMutation.mutate({
      email,
      password
    });
  }
  if (isAuthenticated)
    return /* @__PURE__ */ jsx(Navigate, { to: "/app" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("header", { className: "absolute px-4 md:px-8 mt-8 top-0", children: /* @__PURE__ */ jsxs(
      "a",
      {
        className: "text-zinc-700 font-bold flex items-center gap-1 text-lg hover:text-zinc-900 transition-colors",
        href: "/",
        children: [
          /* @__PURE__ */ jsx(CaretLeft, { size: 16, weight: "bold" }),
          " Home"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "form",
      {
        className: "max-w-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-start flex-col px-4",
        onSubmit: handleLoginSubmit,
        children: [
          /* @__PURE__ */ jsx("h1", { className: "text-zinc-900 font-bold text-2xl tracking-tight", children: "Log in to unilink" }),
          /* @__PURE__ */ jsxs("p", { className: "text-zinc-500 text-lg pb-4", children: [
            "Don't have an account yet?",
            " ",
            /* @__PURE__ */ jsx(Link, { to: "/signup", className: "text-blue-400", children: "Sign Up" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500",
                type: "text",
                placeholder: "john.doe@example.com",
                onChange: (e) => setEmail(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 w-full pb-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("p", { className: "text-zinc-700", children: "Password" }),
              /* @__PURE__ */ jsx("a", { className: "text-zinc-500", href: "#forgot-password", children: "Forgot your password?" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "border-zinc-300 border px-2 rounded-md h-10 bg-zinc-100 w-full text-zinc-800 placeholder:text-zinc-500",
                type: "password",
                placeholder: "••••••••",
                onChange: (e) => setPassword(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "bg-zinc-900 w-full h-10 rounded-md flex items-center justify-center gap-1 leading-none font-medium",
              children: !loginMutation.isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Continue",
                " ",
                /* @__PURE__ */ jsx(
                  CaretRight,
                  {
                    className: "text-zinc-400",
                    size: 16,
                    weight: "bold"
                  }
                )
              ] }) : /* @__PURE__ */ jsx(
                Spinner,
                {
                  className: "text-zinc-200 animate-spin",
                  size: 18,
                  weight: "bold"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-zinc-500 text-sm mt-4", children: "By signing in, you agree to our Terms of Service and Privacy Policy." })
        ]
      }
    )
  ] });
}
function ShareButton() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied)
        setCopied(false);
    }, 1800);
    return () => clearTimeout(timeout);
  }, [copied]);
  return /* @__PURE__ */ jsxs(Popover.Root, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: `text-zinc-800 font-medium tracking-tight text-lg h-10 px-4 rounded-full hover:bg-neutral-200 transition-colors flex gap-2 items-center justify-center ${isOpen && "bg-neutral-200"}`,
        children: [
          /* @__PURE__ */ jsx(ShareNetwork, { size: 18 }),
          " share"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Portal, { children: /* @__PURE__ */ jsx(
      Popover.Content,
      {
        align: "end",
        sideOffset: 10,
        className: "will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white w-96 rounded-xl px-8 py-5 shadow-md", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center relative pb-4", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-zinc-800 font-bold text-xl", children: "Share your unilink" }),
            /* @__PURE__ */ jsx(Popover.Close, { className: "absolute right-5", children: /* @__PURE__ */ jsx(
              X,
              {
                size: 16,
                className: "text-zinc-600",
                weight: "bold"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: user == null ? void 0 : user.username,
              target: "blank",
              className: "text-zinc-800 border border-zinc-400 flex items-center justify-between font-bold text-lg hover:bg-neutral-200 rounded-lg py-3 px-4 transition-colors mb-3",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-neutral-800 p-2 text-zinc-200 rounded-lg", children: /* @__PURE__ */ jsx(Globe, { size: 26, weight: "regular" }) }),
                  "Open my unilink"
                ] }),
                /* @__PURE__ */ jsx(ArrowSquareOut, {})
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setCopied(true);
                navigator.clipboard.writeText(
                  `${window.location.origin}/${user == null ? void 0 : user.username}`
                );
              },
              className: "flex items-center justify-between text-lg bg-zinc-800 hover:bg-zinc-700 rounded-lg py-3 px-4 transition-colors w-full",
              children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  /* @__PURE__ */ jsx("b", { children: "unilink" }),
                  "/",
                  user == null ? void 0 : user.username
                ] }),
                copied ? /* @__PURE__ */ jsx(Check, { className: "text-green-400" }) : /* @__PURE__ */ jsx(Clipboard, {})
              ]
            }
          )
        ] })
      }
    ) })
  ] });
}
function AddLinkCollapsible({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [url, setURL] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(url);
    setURL("");
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs(Collapsible.Root, { open, onOpenChange: setOpen, className: "w-full", children: [
    !open && /* @__PURE__ */ jsx(Collapsible.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "bg-zinc-900 h-10 w-full flex items-center justify-center gap-1 leading-none font-medium rounded-full",
        children: [
          /* @__PURE__ */ jsx(
            Plus,
            {
              className: "text-zinc-400",
              size: 16,
              weight: "bold"
            }
          ),
          " ",
          "Add link"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Collapsible.Content, { children: /* @__PURE__ */ jsxs(
      "form",
      {
        className: "bg-white border-zinc-400 border w-full rounded-xl py-6 px-6",
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-zinc-800 text-lg font-bold", children: "Enter URL" }),
            /* @__PURE__ */ jsx(Collapsible.Trigger, { children: /* @__PURE__ */ jsx(
              X,
              {
                size: 16,
                className: "text-zinc-600",
                weight: "bold"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "px-4 w-full rounded-lg h-10 bg-zinc-100 text-zinc-800 placeholder:text-zinc-500",
                type: "url",
                placeholder: "URL",
                onChange: (e) => setURL(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "text-zinc-200 font-medium tracking-tight h-10 px-5 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors",
                children: "Add"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
AddLinkCollapsible.propTypes = {
  onSubmit: PropTypes.func
};
AddLinkCollapsible.defaultProps = {
  onSubmit: () => {
  }
};
function DeleteLinkButton({ onDelete }) {
  const [open, setOpen] = useState(false);
  function handleDeleteLink() {
    onDelete();
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs(Dialog.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(Dialog.Trigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", children: /* @__PURE__ */ jsx(Trash, { className: "text-zinc-800", size: 20 }) }) }),
    /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
      /* @__PURE__ */ jsx(Dialog.Overlay, { className: "bg-neutral-900/40 data-[state=open]:animate-overlayShow fixed inset-0" }),
      /* @__PURE__ */ jsxs(Dialog.Content, { className: "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none", children: [
        /* @__PURE__ */ jsx(Dialog.Title, { className: "text-zinc-800 font-medium text-lg", children: "Delete link?" }),
        /* @__PURE__ */ jsx(Dialog.Description, { className: "text-zinc-600", children: "This will delete this link permanently. You cannot undo this action." }),
        /* @__PURE__ */ jsx(Dialog.Close, { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx(X, { size: 16, className: "text-zinc-600", weight: "bold" }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-6 justify-end", children: [
          /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "text-zinc-600 hover:text-zinc-800 transition-colors font-medium",
              type: "button",
              children: "Cancel"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleDeleteLink,
              className: "text-red-400 bg-red-50 hover:bg-red-100 h-10 px-3 hover:text-red-600 rounded-md transition-colors font-medium",
              children: "Delete"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
DeleteLinkButton.propTypes = {
  onDelete: PropTypes.func
};
DeleteLinkButton.defaultProps = {
  onDelete: () => {
  }
};
function EditLinkButton({ linkData, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(linkData.title);
  const [url, setURL] = useState(linkData.url);
  function handleUpdateLink() {
    onUpdate({
      ...linkData,
      title,
      url
    });
    setOpen(false);
  }
  return /* @__PURE__ */ jsxs(Dialog.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(Dialog.Trigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { type: "button", children: /* @__PURE__ */ jsx(PencilSimple, { className: "text-zinc-800", size: 20 }) }) }),
    /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
      /* @__PURE__ */ jsx(Dialog.Overlay, { className: "bg-neutral-900/40 data-[state=open]:animate-overlayShow fixed inset-0" }),
      /* @__PURE__ */ jsxs(Dialog.Content, { className: "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none", children: [
        /* @__PURE__ */ jsx(Dialog.Title, { className: "text-zinc-800 font-medium text-lg", children: "Edit link" }),
        /* @__PURE__ */ jsx(Dialog.Description, { className: "text-zinc-600", children: "Make changes to your link here. Click save when you're done." }),
        /* @__PURE__ */ jsx(Dialog.Close, { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx(X, { size: 16, className: "text-zinc-600", weight: "bold" }) }),
        /* @__PURE__ */ jsxs("div", { className: "py-5 gap-2 flex flex-col", children: [
          /* @__PURE__ */ jsxs("fieldset", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "title",
                className: "text-zinc-600 font-medium w-[60px] text-right",
                children: "Title"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "text-zinc border text-zinc-800 border-zinc-400 h-10 w-full flex-1 items-center justify-center rounded-md px-3 leading-none outline-none",
                id: "title",
                defaultValue: linkData == null ? void 0 : linkData.title,
                onChange: (e) => setTitle(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("fieldset", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "text-zinc-600 font-medium w-[60px] text-right",
                htmlFor: "url",
                children: "URL"
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "text-zinc border text-zinc-800 border-zinc-400 h-10 w-full flex-1 items-center justify-center rounded-md px-3 leading-none outline-none",
                id: "url",
                defaultValue: linkData == null ? void 0 : linkData.url,
                onChange: (e) => setURL(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-6 justify-end", children: [
          /* @__PURE__ */ jsx(Dialog.Close, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-zinc-600 hover:text-zinc-800 transition-colors font-medium",
              children: "Cancel"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              onClick: handleUpdateLink,
              className: "text-green-600 bg-green-100 hover:bg-green-200 h-10 px-3 hover:text-green-800 rounded-md transition-colors font-medium",
              children: "Save Changes"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function ToggleLinkVisibility({ checked, onCheckedChange }) {
  return /* @__PURE__ */ jsx(
    Switch.Root,
    {
      checked,
      onCheckedChange,
      className: "w-[42px] h-[25px] bg-gray-500 rounded-full relative data-[state=checked]:bg-green-700 outline-none",
      style: { WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" },
      children: /* @__PURE__ */ jsx(Switch.Thumb, { className: "block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" })
    }
  );
}
ToggleLinkVisibility.propTypes = {
  checked: PropTypes.bool,
  onCheckedChange: PropTypes.func
};
ToggleLinkVisibility.defaultProps = {
  checked: true,
  onCheckedChange: null
};
function EditableLink({
  link,
  onUpdate,
  onDelete,
  active,
  onActiveChange
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-white border-zinc-400 border w-full rounded-xl py-4 px-6 relative",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("h1", { className: "text-lg text-zinc-800 font-bold", children: link == null ? void 0 : link.title }) }),
        /* @__PURE__ */ jsx("p", { className: "text-zinc-800", children: link == null ? void 0 : link.url }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col absolute top-4 right-6 gap-2 items-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(EditLinkButton, { linkData: link, onUpdate }),
            /* @__PURE__ */ jsx(DeleteLinkButton, { id: link.id, onDelete })
          ] }),
          /* @__PURE__ */ jsx(
            ToggleLinkVisibility,
            {
              checked: active,
              onCheckedChange: onActiveChange
            }
          )
        ] })
      ]
    },
    link.id
  );
}
function ReadonlyLink({ link }) {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: link == null ? void 0 : link.url,
      target: "blank",
      className: "bg-white text-zinc-800 font-bold text-center text-lg border-zinc-400 border w-full rounded-xl py-4 px-6",
      children: link == null ? void 0 : link.title
    },
    link == null ? void 0 : link.title
  );
}
ReadonlyLink.propTypes = {
  link: {
    id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string
  }
};
ReadonlyLink.defaultProps = {
  link: null
};
function StrictModeDroppable({ children, ...props }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return /* @__PURE__ */ jsx(Droppable, { ...props, children });
}
function DraggableLinksContainer({
  links,
  onDelete,
  onUpdate,
  onActiveChange,
  onOrderChange
}) {
  return /* @__PURE__ */ jsx(DragDropContext, { onDragEnd: onOrderChange, children: /* @__PURE__ */ jsx(StrictModeDroppable, { droppableId: "links", children: (provided) => /* @__PURE__ */ jsxs(
    "ul",
    {
      className: "w-full flex flex-col gap-2",
      ...provided.droppableProps,
      ref: provided.innerRef,
      children: [
        links.map((link, index2) => /* @__PURE__ */ jsx(
          Draggable,
          {
            draggableId: link.id,
            index: index2,
            children: (provided2) => /* @__PURE__ */ jsx(
              "li",
              {
                ref: provided2.innerRef,
                ...provided2.draggableProps,
                ...provided2.dragHandleProps,
                children: /* @__PURE__ */ jsx(
                  EditableLink,
                  {
                    link,
                    onDelete: () => onDelete(link),
                    onUpdate: (link2) => onUpdate(link2),
                    active: link == null ? void 0 : link.active,
                    onActiveChange: (active) => onActiveChange(link, active)
                  }
                )
              },
              link.id
            )
          },
          link.id
        )),
        provided.placeholder
      ]
    }
  ) }) });
}
function ApplicationPage() {
  const { isAuthenticated, accessToken, user } = useAuth();
  const [data, setData] = useState([]);
  const linkMutation = useMutation({
    mutationFn: async (link) => {
      const { data: newLink } = await api.post("/link", link, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setData([...data, newLink]);
    }
  });
  const updateLinkMutation = useMutation({
    mutationFn: async (link) => {
      await api.put(`/link/${link.id}`, link, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  });
  const deleteLinkMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/link/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
  });
  function onActiveChange(linkToUpdate, active) {
    setData([
      ...data.map((link) => {
        if (link.id === linkToUpdate.id) {
          return {
            ...link,
            active
          };
        }
        return link;
      })
    ]);
  }
  function onUpdateLink(link) {
    updateLinkMutation.mutate(link);
    const filteredLinks = data.filter(({ id }) => link.id !== id);
    setData([...filteredLinks, link]);
  }
  function onDeleteLink(link) {
    deleteLinkMutation.mutate(link.id);
    setData([...data.filter(({ id }) => link.id !== id)]);
  }
  function onOrderChange(result) {
    if (!result.destination)
      return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items.map((link, index2) => ({ ...link, index: index2 })));
    items.forEach(
      (item, index2) => updateLinkMutation.mutate({ ...item, index: index2 })
    );
  }
  useEffect(() => {
    async function execute() {
      const { data: response } = await api.get(`/link/${user == null ? void 0 : user.id}`);
      setData([...response.data]);
    }
    execute();
  }, []);
  async function handleLinkSubmit(url) {
    linkMutation.mutate({
      title: url.replace(/^https?:\/\//, ""),
      url,
      index: data.length
    });
  }
  if (!isAuthenticated)
    return /* @__PURE__ */ jsx(Navigate, { to: "/signin" });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "flex px-8 py-4 justify-between items-center", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "font-bold text-zinc-900 text-2xl tracking-tight",
          children: "unilink"
        }
      ),
      /* @__PURE__ */ jsx(ShareButton, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-lg mx-auto my-14 w-full flex items-center flex-col px-4 gap-4", children: [
      /* @__PURE__ */ jsx(AddLinkCollapsible, { onSubmit: handleLinkSubmit }),
      /* @__PURE__ */ jsx(
        DraggableLinksContainer,
        {
          links: data == null ? void 0 : data.sort(({ index: a }, { index: b }) => a - b),
          onActiveChange,
          onDelete: onDeleteLink,
          onUpdate: onUpdateLink,
          onOrderChange
        }
      )
    ] })
  ] });
}
function ProfilePage() {
  var _a, _b, _c;
  const { username } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    async function execute() {
      const { data: data2 } = await api.get(`/profile/${username}`);
      setData(data2);
    }
    execute();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "mt-20 mx-auto w-full max-w-screen-lg flex items-center flex-col px-4", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: `https://ui-avatars.com/api/?background=111&color=f1f2f6&name=${data == null ? void 0 : data.display_name}`,
        alt: username,
        className: "rounded-full aspect-square h-20 mb-4"
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-zinc-800 text-2xl font-bold tracking-tight leading-tight", children: data == null ? void 0 : data.display_name }),
    /* @__PURE__ */ jsxs("h1", { className: "text-zinc-800 text-lg tracking-tight leading-tight", children: [
      "@",
      username
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-lg mx-auto mt-6 mb-14 w-full flex items-center flex-col px-4 gap-4", children: ((_a = data == null ? void 0 : data.links) == null ? void 0 : _a.length) > 0 && ((_c = (_b = data == null ? void 0 : data.links) == null ? void 0 : _b.sort(({ index: a }, { index: b }) => a - b)) == null ? void 0 : _c.map((link) => /* @__PURE__ */ jsx(ReadonlyLink, { link }, link.id))) }),
    /* @__PURE__ */ jsx("footer", { className: "absolute bottom-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "font-bold text-zinc-900 text-2xl tracking-tight",
        children: "unilink"
      }
    ) })
  ] });
}
const index = "";
const _500 = "";
const _700 = "";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsx(LandingPage, {})
  },
  {
    path: "/signup",
    element: /* @__PURE__ */ jsx(SignupPage, {})
  },
  {
    path: "/signin",
    element: /* @__PURE__ */ jsx(LoginPage, {})
  },
  {
    path: "/app",
    element: /* @__PURE__ */ jsx(ApplicationPage, {})
  },
  {
    path: "/:username",
    element: /* @__PURE__ */ jsx(ProfilePage, {})
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(CookiesProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(RouterProvider, { router }) }) }) }) })
);
