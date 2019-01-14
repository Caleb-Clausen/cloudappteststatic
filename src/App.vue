<template>
  <div id="app">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand tag="h1" class="mb-0">{{ msg }}</b-navbar-brand>
    </b-navbar>
  <b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-3" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" v-on:click="doLoadResults" id="fetch_cloud_news">
            <!-- <b-img fluid rounded="0"  src="/static/func.png" alt="func_logo" width="32" height="32"/>  -->
            Func
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

    <!-- <img src="./assets/logo.png">
    "./assets/func.jpg"
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul> -->
    <!-- <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <b-container v-if="isResultLoaded">
      <b-row>
          <b-col>
            <vue-word-cloud v-if="isCloudLoaded"
              v-bind:words="word_cloud"
              :color="([, weight]) =>  '#0b3241' "
              font-family="Roboto"
            />
            <!-- collor that works 'SkyBlue'  -->
          </b-col>
          <b-col>
            <b-list-group >
              <b-list-group-item
                is="news-item"
                v-for="(news_item, index) in news.Demo.value"
                v-bind:key="news_item.url"
                v-bind:title="news_item.name"
                v-on:remove="news.Demo.value.splice(index, 1)"
              >/</b-list-group-item>
            </b-list-group>
          </b-col>
      </b-row>
  </b-container>
    
  </div>
</template>

<script>
const default_result = {
  "Demo": {
    "_type": "News",
    "readLink": "https://api.cognitive.microsoft.com/api/v7/news/search?q=azure+cloud",
    "totalEstimatedMatches": 1310000,
    "value": [
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149",
            "name": "Windows Azure"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/0e95d5e1-1e66-476f-eda0-0bb417a12c37",
            "name": "Cloud computing"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "ZDNet"
          }
        ],
        "datePublished": "2019-01-03T20:47:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Microsoft Azure: Everything you need to know about Redmond's cloud service",
        "url": "https://www.zdnet.com/article/microsoft-azure-everything-you-need-to-know/",
        "description": "Microsoft Azure is a broad, ever-expanding set of cloud-based computing services that are available to businesses, developers, government agencies, and anyone who wants to build an app or run an enterprise on the internet without having to manage hardware.",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.CB50B48B5DED8E082BA372A35CE05180&pid=News",
            "width": 570,
            "height": 322
          }
        }
      },
      {
        "about": null,
        "provider": [
          {
            "_type": "Organization",
            "name": "SD Times"
          }
        ],
        "datePublished": "2019-01-04T19:13:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Microsoft takes Azure to the next level",
        "url": "https://sdtimes.com/msft/microsoft-takes-azure-to-the-next-level/",
        "description": "Microsoft first developed its cloud computing service Azure with a mission to let developers and organizations do more in the cloud. Over the last year, the company has brought the service beyond ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.0C7B60231285DD55744FF23806BA65DE&pid=News",
            "width": 490,
            "height": 275
          }
        }
      },
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/9d9c40a9-f255-fc05-ea48-3c7685363661",
            "name": "Computerworld"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149",
            "name": "Windows Azure"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "Computerworld"
          }
        ],
        "datePublished": "2019-01-02T22:18:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Crash Course in Azure Active Directory",
        "url": "https://www.computerworld.com/resources/182527/data-management/crash-course-in-azure-active-directory",
        "description": "Azure AD is Microsoft’s cloud-based directory and identity management service. It combines core directory services, advanced identity protection, and application access management. Azure AD delivers single sign-on (SSO) access to on-premises and cloud ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.A94BC8862AFD8A169A0FA650F100C568&pid=News",
            "width": 300,
            "height": 248
          }
        }
      },
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149",
            "name": "Windows Azure"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "SQL Server Central"
          }
        ],
        "datePublished": "2019-01-02T07:11:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Replicate NetSuite Data to Azure SQL (SSIS in Azure Data Factory)",
        "url": "http://www.sqlservercentral.com/articles/Integration+Services+(SSIS_/180310/",
        "description": "Azure Data Factory (ADF) is a scalable, trusted cloud-based solution for building automated data integration solutions with a visual, drag-and-drop UI. Moving on-premises SSIS workloads to Azure can reduce the operational costs of managing infrastructure ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.5202B2CFDFFF37B1D89114D2E89420ED&pid=News",
            "width": 700,
            "height": 469
          }
        }
      },
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149",
            "name": "Windows Azure"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/e3ddc8df-bbab-630e-7b7c-1321a15631ed",
            "name": "Microsoft Dynamics"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/d30d2940-27f4-1035-3a16-b39e0410a136",
            "name": "Conditional access"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "Msdynamicsworld.com"
          }
        ],
        "datePublished": "2019-01-04T20:00:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Microsoft Azure Active Directory Conditional Access and Dynamics 365: Enforce multi-factor authentication",
        "url": "https://msdynamicsworld.com/story/microsoft-azure-active-directory-conditional-access-and-dynamics-365-enforce-multi-factor",
        "description": "With Azure Active Directory Conditional Access, you can control how authorized users can access your cloud applications. Multi-factor authentication (MFA) is a method of authentication that requires more than one verification method and adds a second layer ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.62786DB28E1EA638E8B46C0A1887B36C&pid=News",
            "width": 700,
            "height": 274
          }
        }
      },
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149",
            "name": "Windows Azure"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "petri.com"
          }
        ],
        "datePublished": "2019-01-03T15:12:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "The Easy Ways to Restore Azure VMs From Backup",
        "url": "https://www.petri.com/the-easy-ways-to-restore-azure-vms-from-backup",
        "description": "This is my favorite of the restore options to show to people that are new to Azure because it shows some of the clever things that you can do in an integrated software-defined cloud such as Azure. If you need to restore one or some files from a backup ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.C28C18FD4E4B1931BE83425F68F3C813&pid=News",
            "width": 700,
            "height": 394
          }
        }
      },
      {
        "about": null,
        "provider": [
          {
            "_type": "Organization",
            "name": "DatabaseJournal"
          }
        ],
        "datePublished": "2019-01-03T13:04:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Customizing the Default Azure Data Studio Dashboards",
        "url": "https://www.databasejournal.com/features/mssql/customizing-the-default-azure-data-studio-dashboards.html",
        "description": "Azure Data Studio is a cross-platform database tool to allow data professionals a single user interface to work with databases on premise and in the cloud. This is a free new tool that is available for Windows, Mac, and Linux users. Azure Data Studio is ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.6A5A963AD254B6A57DC46B9375E6ACA9&pid=News",
            "width": 700,
            "height": 377
          }
        }
      },
      {
        "about": [
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/cafb5c69-0d68-2211-85a0-3067c643f408",
            "name": "Oracle Corporation"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/ebf1abd7-9ec4-7875-6a41-a8aaa77bdbb2",
            "name": "Technology"
          },
          {
            "readLink": "https://api.cognitive.microsoft.com/api/v7/entities/4169c32e-169f-50c1-d8ae-d87df1fca415",
            "name": "NativeX"
          }
        ],
        "provider": [
          {
            "_type": "Organization",
            "name": "eWeek"
          }
        ],
        "datePublished": "2019-01-02T20:12:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "How Oracle Is Embracing Cloud-Native Technology to Enable Applications",
        "url": "https://www.eweek.com/cloud/how-oracle-is-embracing-cloud-native-technology-to-enable-applications",
        "description": "Kubernetes is supported by the three major public cloud providers (AWS, Microsoft Azure and Google Cloud Platform) as well other cloud providers, including Oracle and IBM. Quillin said that most customers are committing to multiple clouds and none is ...",
        "image": {
          "contentUrl": null,
          "thumbnail": {
            "contentUrl": "https://www.bing.com/th?id=ON.B478918DF8016E5608DD63B69D1270DC&pid=News",
            "width": 560,
            "height": 300
          }
        }
      },
      {
        "about": null,
        "provider": [
          {
            "_type": "Organization",
            "name": "ZDNet"
          }
        ],
        "datePublished": "2019-01-03T22:23:00Z",
        "clusteredArticles": null,
        "mentions": null,
        "video": null,
        "category": "ScienceAndTechnology",
        "name": "Microsoft Azure: What is it and what can it do for you",
        "url": "https://www.zdnet.com/video/microsoft-azure-everything-you-need-to-know/",
        "description": "Second only to AWS among cloud providers, Microsoft Azure is an ever-expanding set of cloud-based computing services available to businesses, developers, government agencies, and anyone who wants to build an app or run an enterprise without having to ...",
        "image": null
      }
    ]
  },
  "RawJson": "{\r\n  \"_type\": \"News\",\r\n  \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/news/search?q=azure+cloud\",\r\n  \"totalEstimatedMatches\": 1310000,\r\n  \"value\": [\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149\",\r\n          \"name\": \"Windows Azure\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/0e95d5e1-1e66-476f-eda0-0bb417a12c37\",\r\n          \"name\": \"Cloud computing\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"ZDNet\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-03T20:47:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Microsoft Azure: Everything you need to know about Redmond's cloud service\",\r\n      \"url\": \"https://www.zdnet.com/article/microsoft-azure-everything-you-need-to-know/\",\r\n      \"description\": \"Microsoft Azure is a broad, ever-expanding set of cloud-based computing services that are available to businesses, developers, government agencies, and anyone who wants to build an app or run an enterprise on the internet without having to manage hardware.\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.CB50B48B5DED8E082BA372A35CE05180&pid=News\",\r\n          \"width\": 570,\r\n          \"height\": 322\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": null,\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"SD Times\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-04T19:13:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Microsoft takes Azure to the next level\",\r\n      \"url\": \"https://sdtimes.com/msft/microsoft-takes-azure-to-the-next-level/\",\r\n      \"description\": \"Microsoft first developed its cloud computing service Azure with a mission to let developers and organizations do more in the cloud. Over the last year, the company has brought the service beyond ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.0C7B60231285DD55744FF23806BA65DE&pid=News\",\r\n          \"width\": 490,\r\n          \"height\": 275\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/9d9c40a9-f255-fc05-ea48-3c7685363661\",\r\n          \"name\": \"Computerworld\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149\",\r\n          \"name\": \"Windows Azure\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"Computerworld\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-02T22:18:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Crash Course in Azure Active Directory\",\r\n      \"url\": \"https://www.computerworld.com/resources/182527/data-management/crash-course-in-azure-active-directory\",\r\n      \"description\": \"Azure AD is Microsoft’s cloud-based directory and identity management service. It combines core directory services, advanced identity protection, and application access management. Azure AD delivers single sign-on (SSO) access to on-premises and cloud ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.A94BC8862AFD8A169A0FA650F100C568&pid=News\",\r\n          \"width\": 300,\r\n          \"height\": 248\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149\",\r\n          \"name\": \"Windows Azure\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"SQL Server Central\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-02T07:11:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Replicate NetSuite Data to Azure SQL (SSIS in Azure Data Factory)\",\r\n      \"url\": \"http://www.sqlservercentral.com/articles/Integration+Services+(SSIS_/180310/\",\r\n      \"description\": \"Azure Data Factory (ADF) is a scalable, trusted cloud-based solution for building automated data integration solutions with a visual, drag-and-drop UI. Moving on-premises SSIS workloads to Azure can reduce the operational costs of managing infrastructure ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.5202B2CFDFFF37B1D89114D2E89420ED&pid=News\",\r\n          \"width\": 700,\r\n          \"height\": 469\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149\",\r\n          \"name\": \"Windows Azure\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/e3ddc8df-bbab-630e-7b7c-1321a15631ed\",\r\n          \"name\": \"Microsoft Dynamics\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/d30d2940-27f4-1035-3a16-b39e0410a136\",\r\n          \"name\": \"Conditional access\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"Msdynamicsworld.com\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-04T20:00:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Microsoft Azure Active Directory Conditional Access and Dynamics 365: Enforce multi-factor authentication\",\r\n      \"url\": \"https://msdynamicsworld.com/story/microsoft-azure-active-directory-conditional-access-and-dynamics-365-enforce-multi-factor\",\r\n      \"description\": \"With Azure Active Directory Conditional Access, you can control how authorized users can access your cloud applications. Multi-factor authentication (MFA) is a method of authentication that requires more than one verification method and adds a second layer ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.62786DB28E1EA638E8B46C0A1887B36C&pid=News\",\r\n          \"width\": 700,\r\n          \"height\": 274\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cf3abf7d-e379-2693-f765-6da6b9fa9149\",\r\n          \"name\": \"Windows Azure\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"petri.com\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-03T15:12:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"The Easy Ways to Restore Azure VMs From Backup\",\r\n      \"url\": \"https://www.petri.com/the-easy-ways-to-restore-azure-vms-from-backup\",\r\n      \"description\": \"This is my favorite of the restore options to show to people that are new to Azure because it shows some of the clever things that you can do in an integrated software-defined cloud such as Azure. If you need to restore one or some files from a backup ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.C28C18FD4E4B1931BE83425F68F3C813&pid=News\",\r\n          \"width\": 700,\r\n          \"height\": 394\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": null,\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"DatabaseJournal\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-03T13:04:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Customizing the Default Azure Data Studio Dashboards\",\r\n      \"url\": \"https://www.databasejournal.com/features/mssql/customizing-the-default-azure-data-studio-dashboards.html\",\r\n      \"description\": \"Azure Data Studio is a cross-platform database tool to allow data professionals a single user interface to work with databases on premise and in the cloud. This is a free new tool that is available for Windows, Mac, and Linux users. Azure Data Studio is ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.6A5A963AD254B6A57DC46B9375E6ACA9&pid=News\",\r\n          \"width\": 700,\r\n          \"height\": 377\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": [\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/cafb5c69-0d68-2211-85a0-3067c643f408\",\r\n          \"name\": \"Oracle Corporation\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/ebf1abd7-9ec4-7875-6a41-a8aaa77bdbb2\",\r\n          \"name\": \"Technology\"\r\n        },\r\n        {\r\n          \"readLink\": \"https://api.cognitive.microsoft.com/api/v7/entities/4169c32e-169f-50c1-d8ae-d87df1fca415\",\r\n          \"name\": \"NativeX\"\r\n        }\r\n      ],\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"eWeek\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-02T20:12:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"How Oracle Is Embracing Cloud-Native Technology to Enable Applications\",\r\n      \"url\": \"https://www.eweek.com/cloud/how-oracle-is-embracing-cloud-native-technology-to-enable-applications\",\r\n      \"description\": \"Kubernetes is supported by the three major public cloud providers (AWS, Microsoft Azure and Google Cloud Platform) as well other cloud providers, including Oracle and IBM. Quillin said that most customers are committing to multiple clouds and none is ...\",\r\n      \"image\": {\r\n        \"contentUrl\": null,\r\n        \"thumbnail\": {\r\n          \"contentUrl\": \"https://www.bing.com/th?id=ON.B478918DF8016E5608DD63B69D1270DC&pid=News\",\r\n          \"width\": 560,\r\n          \"height\": 300\r\n        }\r\n      }\r\n    },\r\n    {\r\n      \"about\": null,\r\n      \"provider\": [\r\n        {\r\n          \"_type\": \"Organization\",\r\n          \"name\": \"ZDNet\"\r\n        }\r\n      ],\r\n      \"datePublished\": \"2019-01-03T22:23:00Z\",\r\n      \"clusteredArticles\": null,\r\n      \"mentions\": null,\r\n      \"video\": null,\r\n      \"category\": \"ScienceAndTechnology\",\r\n      \"name\": \"Microsoft Azure: What is it and what can it do for you\",\r\n      \"url\": \"https://www.zdnet.com/video/microsoft-azure-everything-you-need-to-know/\",\r\n      \"description\": \"Second only to AWS among cloud providers, Microsoft Azure is an ever-expanding set of cloud-based computing services available to businesses, developers, government agencies, and anyone who wants to build an app or run an enterprise without having to ...\",\r\n      \"image\": null\r\n    }\r\n  ]\r\n}",
  "QueryString": null,
  "Query": null,
  "Market": "en-us",
  "Freshness": null
}
export default {
  name: 'app',
  data () {
    return {
      isResultLoaded: false,
      isCloudLoaded : false,
      msg: 'ContosoNewsCloud',
      news : default_result ,
      word_cloud :[['tbd', 1]]
    }
  },
  methods: {
    doLoadResults: function (event) {
      // update word cloud
      const remote = true ;
      if(remote) {
        this.isCloudLoaded = false;
        this.axios({
          method: 'post',
          url: 'https://newsclouddemo.azurewebsites.net/api/NewsFeedConversion',
          data: {
            source_news_results:  this.news,
          }
        }).then(response => {
          
          this.word_cloud = response.data;
          this.isCloudLoaded = true;
        })

      } else {
          this.updateWordCloud();
      }
      
      // make visible
      this.isResultLoaded = true;
    },

    updateWordCloud: function() {
      let new_cloud = {};
      const stopwords = ['in', 'the', 'to', 'from', 'who', 'what'];
      for(var key in this.news.Demo.value) {
        let obj = this.news.Demo.value[key];
        const words = obj.name.split(" ");
        for (var word_id in words) {
          const word = words[word_id];
          let cloud_item = new_cloud[word];
          if (!cloud_item) {
            new_cloud[word] = {
              text: word,
              weight: 1,
            }
          } else {
            cloud_item['weight']  = cloud_item['weight'] +1;
          }
          //console.warn('new_cloud[word]',word,new_cloud[word]);
        }
        //console.warn('new_cloud_update',new_cloud);
      }
      this.word_cloud = Object.values(new_cloud).filter(w => !stopwords.includes(w.text));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
