const MainPageStructure = (props) => {

    return (
        <div>
            <h2>BlogApp</h2>
            {props.blogForm}
            <div>
                <p>{`${props.user.data.name} Logged in `}<button onClick={() => { }}>logout</button> </p>
            </div>
            {props.children}
        </div>
    )

}

export default MainPageStructure