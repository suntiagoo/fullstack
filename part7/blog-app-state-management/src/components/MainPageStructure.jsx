const MainPageStructure = (props) => {

    return (
        <div>
            <h2>BlogApp</h2>{/*props.blogForm*/}<div><p>{`${props.user.data.name} logged in `}<button onClick={() => { props.handleLogOut() }}>logout</button> </p>
            </div>
            {props.children}
        </div>
    )

}

export default MainPageStructure