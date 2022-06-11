import { useEffect, useState } from 'react'
import axios from "axios"

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false)
    
    useEffect(() => {
        let requestInterceptor, responseInterceptor

        const updateApiCallFor = (method, url, inProgress) => {
            if(method !== apiMethod){
                return
            }
            if(strictPath && url === apiPath){
                setPendingApiCall(inProgress)
            } else if(!strictPath && url.startsWith(apiPath)){
                 setPendingApiCall(inProgress)
            }
        }

        const registerInterceptors = () => {

            requestInterceptor = axios.interceptors.request.use((request) => {
                const { url, method } = request
                updateApiCallFor(method, url, true)
                return request
            })
    
            responseInterceptor = axios.interceptors.response.use((response) => {
                const { url, method } = response.config
                updateApiCallFor(method, url, false)
                return response
            }, 
            (error) => {
                const { url, method } = error.config
                updateApiCallFor(method, url, false)
                throw error
            })
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }

        registerInterceptors()

        return function unmount() {
            unregisterInterceptors()
        }

    },[apiPath, apiMethod, strictPath])
    
    return pendingApiCall
}

/* function getDisplayName(wrappedComponent) {
    return wrappedComponent.displayName || wrappedComponent.name || 'Component'
}

export function withApiProgress(WrappedComponent, apiPath){
    return class extends Component {

        // static displayName = 'ApiProgress('+getDisplayName(_wrappedComponent)+')'
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`

        state = {
          pendingApiCall: false
        }
    
        componentDidMount(){
            this.registerInterceptors()
        }

        componentWillUnmount(){
            this.unregisterInterceptors()
        }

        registerInterceptors = () => {
            this.requestInterceptor = axios.interceptors.request.use((request) => {
                this.updateApiCallFor(request.url, true)
                return request
            })
    
            this.responseInterceptor = axios.interceptors.response.use((response) => {
                this.updateApiCallFor(response.config.url, false)
                return response
            }, 
            (error) => {
                this.updateApiCallFor(error.config.url, false)
                throw error
            })
        }

        unregisterInterceptors = () => {
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }
    
        updateApiCallFor = (url, inProgress) => {
            if(url === apiPath){
                this.setState({ pendingApiCall: inProgress })
            }
        }
        
        render() {
            const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall
            return <WrappedComponent {...this.props} pendingApiCall={pendingApiCall}/>
        }
    }
} */