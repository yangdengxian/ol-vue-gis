const routes = [{
        path: '/map',
        component: () =>
            import ('../src/components/Map'),
    },
    {
        path: '/channel',
        component: () =>
            import ('../src/components/style/Channel'),
    },
    {
        path: '/canvas',
        component: () =>
            import ('../src/components/style/Canvas'),
    },
    {
        path: '/',
        redirect: '/map' //系统默认页
    }
]


export default routes;