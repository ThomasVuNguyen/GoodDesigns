self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))\\/api-beta(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/api-beta"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))(?:\\/(api\\/[^/]+\\/contentful.*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/(api/[^/]+/contentful.*)"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))(?:\\/(api\\/[^/]+\\/listPrices.*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/(api/[^/]+/listPrices.*)"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))(?:\\/(api\\/[^/]+\\/getOfferCodeStatus))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/(api/[^/]+/getOfferCodeStatus)"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))(?:\\/((?!_next|api|front-static|.well-known|front-api|apple-touch-icon|favicon.ico|sandbox\\/app-router(?:\\/|$)|front-app-router-static(?:\\/|$)).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|api|front-static|.well-known|front-api|apple-touch-icon|favicon.ico|sandbox/app-router(?:/|$)|front-app-router-static(?:/|$)).*)"
  },
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/)[^/.]{1,}))(|\\.json|\\/?index|\\/?index\\.json|\\/?index(?:\\.rsc|\\.segments\\/.+\\.segment\\.rsc))?[\\/#\\?]?$",
    "originalSource": "/"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()