export default function AppTitle(props){
    const {title="Box Office",subtitle="Are u looking for movie or an actor"}=props;
    return (
        <div>
            <h1>
                {title}
                <p>{subtitle}</p>
            </h1>
        </div>
    )
}